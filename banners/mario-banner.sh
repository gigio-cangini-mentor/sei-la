#!/bin/bash
# Super Mario Bros ASCII Art Banner for Claude Code
# Displayed before Claude Code starts

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
WHITE='\033[1;37m'
BROWN='\033[0;33m'
NC='\033[0m' # No Color

clear_line() { printf "\033[2K"; }

# Frame 1 - Mario standing
frame1() {
cat << 'EOF'

         ⬛⬛⬛⬛⬛
        ⬛🟥🟥🟥🟥🟥⬛
       ⬛🟥🟥🟥🟥🟥🟥🟥⬛
       ⬛🟫🟫🟫🟨⬛🟨⬛
      ⬛🟫🟨🟫🟨🟨⬛🟨🟨⬛
      ⬛🟫🟨🟫🟫🟨🟨🟨🟨⬛
       ⬛⬛🟨🟨🟨🟨🟨⬛
        ⬛🟥🟦🟥🟥⬛
       ⬛🟥🟥🟦🟥🟥🟦⬛
      ⬛🟥🟥🟥🟦🟦🟥🟥⬛
      ⬛🟨🟨🟥🟦🟧🟦🟥⬛
      ⬛🟨🟨🟨🟦🟦🟦🟦⬛
      ⬛🟨🟨🟦🟦🟦🟦⬛
       ⬛⬛🟦🟦⬛🟦🟦⬛
      ⬛🟫🟫🟫⬛⬛🟫🟫⬛
     ⬛🟫🟫🟫🟫⬛🟫🟫🟫⬛

EOF
}

# Frame 2 - Mario jumping
frame2() {
cat << 'EOF'


         ⬛⬛⬛⬛⬛
        ⬛🟥🟥🟥🟥🟥⬛
       ⬛🟥🟥🟥🟥🟥🟥🟥⬛
       ⬛🟫🟫🟫🟨⬛🟨⬛
      ⬛🟫🟨🟫🟨🟨⬛🟨🟨⬛
      ⬛🟫🟨🟫🟫🟨🟨🟨🟨⬛
       ⬛⬛🟨🟨🟨🟨🟨⬛
       ⬛🟥🟥🟦🟥🟥🟥⬛
      ⬛🟦🟥🟦🟦🟥🟦🟨⬛
      ⬛🟦🟦🟦🟦🟦🟦🟨⬛
      ⬛⬛🟦🟧🟦🟧🟦⬛
       ⬛🟨🟨🟨🟨🟨⬛
        ⬛🟨🟨⬛🟨⬛
       ⬛🟫🟫⬛⬛🟫🟫⬛
      ⬛🟫🟫🟫⬛🟫🟫🟫⬛

EOF
}

# Animation: Mario jumps
printf "\033[?25l"  # Hide cursor

# Show frame 1 (standing)
printf "\033[H\033[2J"
frame1
sleep 0.4

# Show frame 2 (jumping)
printf "\033[H\033[2J"
frame2
sleep 0.3

# Show frame 1 again (landing)
printf "\033[H\033[2J"
frame1
sleep 0.3

# Final banner with text
printf "\033[H\033[2J"
echo ""
echo -e "${RED}    ███████╗ ██████╗ ███████╗ ██████╗${NC}"
echo -e "${RED}    ██╔════╝██╔═══██╗██╔════╝██╔════╝${NC}"
echo -e "${RED}    █████╗  ██║   ██║███████╗██║     ${NC}"
echo -e "${RED}    ██╔══╝  ██║   ██║╚════██║██║     ${NC}"
echo -e "${RED}    ██║     ╚██████╔╝███████║╚██████╗${NC}"
echo -e "${RED}    ╚═╝      ╚═════╝ ╚══════╝ ╚═════╝${NC}"
echo ""
echo -e "${YELLOW}    ★ Let's-a go! ★${NC}  ${WHITE}AIOS Core ${GREEN}v2.1${NC}"
echo -e "${BLUE}    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

printf "\033[?25h"  # Show cursor

sleep 0.8
