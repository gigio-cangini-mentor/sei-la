#!/usr/bin/env node
'use strict';

/**
 * Send Now — Non-interactive version for CLI automation
 *
 * Usage:
 *   node scripts/send-now.js [groupIndex] [delayMode]
 *
 * Examples:
 *   node scripts/send-now.js 1 1  # Grupo 1, Modo NATURAL
 *   node scripts/send-now.js      # Auto: primeiro grupo, modo NATURAL
 */

const fs = require('fs');
const path = require('path');

// Parse CLI args
const groupIndex = parseInt(process.argv[2]) || 1;
const delayMode = parseInt(process.argv[3]) || 1;

// Manual .env parsing
const envPath = path.join(__dirname, '../.env');
if (fs.existsSync(envPath)) {
  const envFile = fs.readFileSync(envPath, 'utf8');
  envFile.split('\n').forEach(line => {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim();
      process.env[key] = value;
    }
  });
}

const { splitMessageIntoParts } = require('../lib/message-splitter');

// Import HTTP helpers
const http = require('http');

// Delay modes
const DELAY_MODES = {
  1: { name: 'NATURAL', betweenParts: { min: 2000, max: 4000 }, betweenMessages: { min: 5000, max: 10000 } },
  2: { name: 'RÁPIDO', betweenParts: { min: 1000, max: 2000 }, betweenMessages: { min: 3000, max: 5000 } },
  3: { name: 'CONSERVADOR', betweenParts: { min: 3000, max: 6000 }, betweenMessages: { min: 10000, max: 20000 } },
  4: { name: 'SUPER CONSERVADOR', betweenParts: { min: 5000, max: 8000 }, betweenMessages: { min: 30000, max: 60000 } }
};

// Helper: random delay
function randomDelay(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Helper: HTTP request
function httpRequest(url, options, body = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(url, options, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve({ statusCode: res.statusCode, body: json });
        } catch {
          resolve({ statusCode: res.statusCode, body: data });
        }
      });
    });

    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

// Read TSV
function readTSV(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`TSV não encontrado: ${filePath}`);
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n').filter(l => l.trim());

  const rows = lines.slice(1).map(line => {
    const values = line.split('\t');
    return {
      nome: values[0]?.trim() || '',
      telefone: values[1]?.trim() || '',
      grupo: values[2]?.trim() || '',
      mensagem: values[5]?.trim() || '',
      statusEnvio: values[7]?.trim() || 'Não enviado'
    };
  });

  return rows.filter(r => r.nome && r.telefone && r.mensagem);
}

// Detect groups
function detectGroups(contacts) {
  return [...new Set(contacts.map(c => c.grupo))].filter(g => g).sort();
}

// Filter contacts
function filterContacts(contacts, groupName) {
  return contacts.filter(c => c.grupo === groupName && (c.statusEnvio === 'Não enviado' || c.statusEnvio === ''));
}

// Send message
async function sendMessage(apiUrl, apiKey, instanceName, phone, text, delay = 1000) {
  const url = `${apiUrl}/message/sendText/${instanceName}`;
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'apikey': apiKey }
  };

  const body = { number: phone, text: text, delay: delay };
  const result = await httpRequest(url, options, body);

  if (result.statusCode !== 201 && result.statusCode !== 200) {
    throw new Error(`Evolution API error: ${result.statusCode} - ${JSON.stringify(result.body)}`);
  }

  return result.body;
}

// Main
async function main() {
  try {
    console.log('╔════════════════════════════════════════════════════════════╗');
    console.log('║  Ensinio Prospector — Envio Automático                    ║');
    console.log('╚════════════════════════════════════════════════════════════╝\n');

    // Read TSV
    const tsvPath = path.join(__dirname, '../data/outputs/mentoria-50k/outreach-sheets-final.tsv');
    const allContacts = readTSV(tsvPath);
    console.log(`✅ ${allContacts.length} contatos lidos do TSV\n`);

    // Detect groups
    const groups = detectGroups(allContacts);
    console.log(`📊 Grupos disponíveis: ${groups.length}\n`);

    groups.forEach((group, index) => {
      const count = filterContacts(allContacts, group).length;
      console.log(`   ${index + 1}. ${group} (${count} não enviados)`);
    });

    // Select group
    const selectedGroupIndex = groupIndex - 1;
    if (selectedGroupIndex < 0 || selectedGroupIndex >= groups.length) {
      throw new Error(`Grupo inválido: ${groupIndex}`);
    }

    const selectedGroup = groups[selectedGroupIndex];
    const pendingContacts = filterContacts(allContacts, selectedGroup);

    console.log(`\n✅ Grupo selecionado: ${selectedGroup}`);
    console.log(`📋 Contatos a enviar: ${pendingContacts.length}\n`);

    if (pendingContacts.length === 0) {
      console.log('✅ Todos contatos já foram enviados!\n');
      return;
    }

    // Select mode
    const mode = DELAY_MODES[delayMode];
    if (!mode) {
      throw new Error(`Modo inválido: ${delayMode}`);
    }

    console.log(`⏱️  Modo: ${mode.name}`);
    console.log(`   Entre partes: ${mode.betweenParts.min / 1000}-${mode.betweenParts.max / 1000}s`);
    console.log(`   Entre mensagens: ${mode.betweenMessages.min / 1000}-${mode.betweenMessages.max / 1000}s\n`);

    // Send batch
    const apiUrl = process.env.EVOLUTION_API_URL;
    const apiKey = process.env.EVOLUTION_API_KEY;
    const instanceName = process.env.EVOLUTION_INSTANCE_SENDER;

    console.log('🚀 Iniciando envio...\n');

    const results = { total: pendingContacts.length, sent: 0, failed: 0, errors: [] };
    const promises = [];

    for (let i = 0; i < pendingContacts.length; i++) {
      const contact = pendingContacts[i];

      try {
        console.log(`[${i + 1}/${pendingContacts.length}] 📤 ${contact.nome} (${contact.telefone})`);

        // Normalize phone
        let phone = contact.telefone.replace(/\D/g, '');
        if (!phone.startsWith('55')) phone = '55' + phone;

        // Split message
        const parts = splitMessageIntoParts(contact.mensagem);

        // Send each part
        for (let j = 0; j < parts.length; j++) {
          const partDelay = randomDelay(mode.betweenParts.min, mode.betweenParts.max);

          const promise = sendMessage(apiUrl, apiKey, instanceName, phone, parts[j], partDelay)
            .then(() => {
              console.log(`   ✅ [${j + 1}/${parts.length}] "${parts[j].substring(0, 40)}..."`);
            })
            .catch(error => {
              console.error(`   ❌ Erro parte ${j + 1}: ${error.message}`);
              results.errors.push({ contact: contact.nome, phone: contact.telefone, part: j + 1, error: error.message });
            });

          promises.push(promise);
        }

        results.sent++;

      } catch (error) {
        console.error(`   ❌ Erro: ${error.message}`);
        results.failed++;
        results.errors.push({ contact: contact.nome, phone: contact.telefone, error: error.message });
      }
    }

    // Wait for all
    console.log(`\n⏳ Aguardando confirmação de todos os envios...\n`);
    await Promise.allSettled(promises);

    // Summary
    console.log('\n╔════════════════════════════════════════════════════════════╗');
    console.log('║  RESUMO DO ENVIO                                           ║');
    console.log('╠════════════════════════════════════════════════════════════╣');
    console.log(`║  Total: ${String(results.total).padEnd(50)} ║`);
    console.log(`║  Enviados: ${String(results.sent).padEnd(47)} ║`);
    console.log(`║  Falhas: ${String(results.failed).padEnd(49)} ║`);
    console.log('╚════════════════════════════════════════════════════════════╝\n');

    if (results.errors.length > 0) {
      console.log('❌ Erros:');
      results.errors.slice(0, 5).forEach(err => {
        console.log(`   - ${err.contact} (${err.phone}): ${err.error}`);
      });
      if (results.errors.length > 5) {
        console.log(`   ... e mais ${results.errors.length - 5} erros`);
      }
    }

    console.log('\n✅ Envio concluído!');
    console.log(`📊 Dashboard: ${apiUrl}/manager/\n`);

  } catch (error) {
    console.error(`\n❌ Erro fatal: ${error.message}`);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run
main();
