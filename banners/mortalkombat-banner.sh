#!/bin/bash

# Mortal Kombat AIOS Core Banner
# Animated ASCII art with ANSI colors

# ANSI Color Codes
RED='\033[0;31m'
BRED='\033[1;31m'
YELLOW='\033[0;33m'
BYELLOW='\033[1;33m'
WHITE='\033[0;37m'
BWHITE='\033[1;37m'
GRAY='\033[0;90m'
NC='\033[0m' # No Color

# Hide cursor
printf "\033[?25l"

# Clear screen
clear

# Frame 1: Dragon appears
printf "\033[H\033[2J"
echo -e "${BRED}"
cat << EOF
                    _______________
                 .-'               '-.
               .'                     '.
              /    ${BYELLOW}___${BRED}           ${BYELLOW}___${BRED}    \\
             |    ${BYELLOW}/   \\${BRED}         ${BYELLOW}/   \\${BRED}    |
             |    ${BYELLOW}\\___/${BRED}         ${BYELLOW}\\___/${BRED}    |
             |                           |
              \\         ${BWHITE}^^^^^^^${BRED}         /
               '.       ${BWHITE}\\_____/${BRED}       .'
                 '-._    ${BWHITE}|||||${BRED}    _.-'
                     '"""""""""""'

                ${BYELLOW}MORTAL KOMBAT${BRED}
EOF
sleep 0.35

# Frame 2: Flash effect with "CODE HIM!"
printf "\033[H\033[2J"
echo -e "${BYELLOW}"
cat << EOF
                    _______________
                 .-'               '-.
               .'                     '.
              /    ___           ___    \\
             |    /   \\         /   \\    |
             |    \\___/         \\___/    |
             |                           |
              \\         ^^^^^^^         /
               '.       \\_____/       .'
                 '-._    |||||    _.-'
                     '"""""""""""'

EOF
echo -e "${BWHITE}              ╔═══════════════════╗"
echo -e "              ║  ${BYELLOW}★ CODE HIM! ★${BWHITE}  ║"
echo -e "              ╚═══════════════════╝${NC}"
sleep 0.4

# Frame 3: Final FOSC branding
printf "\033[H\033[2J"
echo -e "${BRED}"
cat << EOF
    ███████╗ ██████╗ ███████╗ ██████╗
    ██╔════╝██╔═══██╗██╔════╝██╔════╝
    █████╗  ██║   ██║███████╗██║
    ██╔══╝  ██║   ██║╚════██║██║
    ██║     ╚██████╔╝███████║╚██████╗
    ╚═╝      ╚═════╝ ╚══════╝ ╚═════╝
EOF

echo ""
echo -e "${BYELLOW}    ═══════════════════════════════════${NC}"
echo -e "${BWHITE}      ★ FINISH HIM! ★  ${GRAY}AIOS Core v2.1${NC}"
echo -e "${BYELLOW}    ═══════════════════════════════════${NC}"
echo ""
echo -e "${GRAY}    AI-Orchestrated Intelligence System${NC}"
echo -e "${GRAY}    Full Stack Development Framework${NC}"
echo ""

# Show cursor
printf "\033[?25h"
