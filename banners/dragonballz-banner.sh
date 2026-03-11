#!/bin/bash

# Dragon Ball Z Banner for AIOS Core
# Goku powering up to Super Saiyan animation

# Colors
YELLOW='\033[1;33m'
CYAN='\033[1;36m'
BLUE='\033[1;34m'
RED='\033[1;31m'
WHITE='\033[1;37m'
GREEN='\033[1;32m'
MAGENTA='\033[1;35m'
NC='\033[0m' # No Color

# Hide cursor
printf "\033[?25l"

# Frame 1: Base Goku charging energy
printf "\033[H\033[2J"
echo -e "
                    ⚡
               ${CYAN}    ___
                   /   \\
                  | o o |
                   \___/
                    |||
               ${WHITE}   /||||\\
                  | || |
                  | || |
                   \\||/
                   /  \\
                  /    \\
                 /      \\${NC}

           ${BLUE}Gathering energy...${NC}
           ${CYAN}Power Level: 150${NC}
"
sleep 0.35

# Frame 2: Powering up, bigger aura
printf "\033[H\033[2J"
echo -e "
              ⚡  ${YELLOW}⚡${NC}  ⚡
           ${YELLOW}✨${NC}     ${CYAN}___${NC}     ${YELLOW}✨${NC}
         🟡     ${CYAN}/   \\${NC}     🟡
              ${CYAN}| O O |${NC}
         ⚡    ${CYAN}\___/${NC}    ⚡
                ${CYAN}|||${NC}
         ${YELLOW}✨${NC}   ${WHITE}/||||\\${NC}   ${YELLOW}✨${NC}
      ${YELLOW}🟡${NC}     ${WHITE}| || |${NC}     ${YELLOW}🟡${NC}
              ${WHITE}| || |${NC}
         ⚡    ${WHITE}\\||/${NC}    ⚡
               ${WHITE}/  \\${NC}
         ${YELLOW}✨${NC}   ${WHITE}/    \\${NC}   ${YELLOW}✨${NC}
             ${WHITE}/      \\${NC}

       ${MAGENTA}━━━━━━━━━━━━━━━━━━━━${NC}
       ${RED}POWER LEVEL RISING...${NC}
       ${CYAN}Power Level: 8,500${NC}
       ${MAGENTA}━━━━━━━━━━━━━━━━━━━━${NC}
"
sleep 0.35

# Frame 3: FULL SUPER SAIYAN
printf "\033[H\033[2J"
echo -e "
     ${YELLOW}⚡✨⚡  ⚡✨⚡  ⚡✨⚡${NC}
   ${YELLOW}✨🟡✨${NC}   ${YELLOW}___${NC}   ${YELLOW}✨🟡✨${NC}
  ${YELLOW}⚡${NC}  ${YELLOW}🟡${NC}   ${YELLOW}/\\\\\\\\\\${NC}   ${YELLOW}🟡${NC}  ${YELLOW}⚡${NC}
   ${YELLOW}✨${NC}     ${YELLOW}| O O |${NC}     ${YELLOW}✨${NC}
  ${YELLOW}🟡${NC}  ${YELLOW}⚡${NC}  ${YELLOW}\___/${NC}  ${YELLOW}⚡${NC}  ${YELLOW}🟡${NC}
            ${YELLOW}|||${NC}
   ${YELLOW}✨⚡${NC}  ${WHITE}/||||\\${NC}  ${YELLOW}⚡✨${NC}
  ${YELLOW}🟡✨${NC}  ${WHITE}| || |${NC}  ${YELLOW}✨🟡${NC}
   ${YELLOW}⚡${NC}    ${WHITE}| || |${NC}    ${YELLOW}⚡${NC}
  ${YELLOW}✨🟡${NC}   ${WHITE}\\||/${NC}   ${YELLOW}🟡✨${NC}
   ${YELLOW}⚡${NC}     ${WHITE}/  \\${NC}     ${YELLOW}⚡${NC}
  ${YELLOW}✨${NC}     ${WHITE}/    \\${NC}     ${YELLOW}✨${NC}
 ${YELLOW}🟡⚡${NC}   ${WHITE}/      \\${NC}   ${YELLOW}⚡🟡${NC}
  ${YELLOW}✨⚡✨⚡✨⚡✨⚡✨${NC}

  ${RED}╔═══════════════════════╗${NC}
  ${RED}║                       ║${NC}
  ${RED}║  ${YELLOW}IT'S OVER 9000!!!${RED}  ║${NC}
  ${RED}║                       ║${NC}
  ${RED}╚═══════════════════════╝${NC}
"
sleep 0.4

# Frame 4: Final FOSC branding
printf "\033[H\033[2J"
echo -e "
   ${YELLOW}███████╗ ██████╗ ███████╗ ██████╗${NC}
   ${YELLOW}██╔════╝██╔═══██╗██╔════╝██╔════╝${NC}
   ${YELLOW}█████╗  ██║   ██║███████╗██║     ${NC}
   ${YELLOW}██╔══╝  ██║   ██║╚════██║██║     ${NC}
   ${YELLOW}██║     ╚██████╔╝███████║╚██████╗${NC}
   ${YELLOW}╚═╝      ╚═════╝ ╚══════╝ ╚═════╝${NC}

      ${CYAN}★━━━━━━━━━━━━━━━━━━━━━━━★${NC}
       ${MAGENTA}It's over 9000!${NC}
       ${WHITE}AIOS Core v2.1${NC}
      ${CYAN}★━━━━━━━━━━━━━━━━━━━━━━━★${NC}

       ${GREEN}⚡ AI-Orchestrated System ⚡${NC}
       ${BLUE}Full Stack Development Framework${NC}
"

# Show cursor
printf "\033[?25h"

echo ""
