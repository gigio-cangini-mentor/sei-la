#!/bin/bash

# Tetris Banner Animation for AIOS Core
# Animated ASCII art with falling Tetris pieces

# ANSI color codes
RESET='\033[0m'
CYAN='\033[96m'
YELLOW='\033[93m'
RED='\033[91m'
GREEN='\033[92m'
MAGENTA='\033[95m'
ORANGE='\033[38;5;208m'
BOLD='\033[1m'
DIM='\033[2m'

# Hide cursor
printf "\033[?25l"

# Frame 1: Pieces falling
printf "\033[H\033[2J"
cat << "EOF"

                    🟦🟦
                    🟦🟦

         🟨🟨🟨🟨




                              🟥🟥
                              🟥🟥


EOF
sleep 0.35

# Frame 2: Pieces falling further
printf "\033[H\033[2J"
cat << "EOF"



         🟨🟨🟨🟨

                    🟦🟦
                    🟦🟦


                              🟥🟥
                              🟥🟥

                  🟩🟩🟩
                    🟩
EOF
sleep 0.35

# Frame 3: Pieces stacking
printf "\033[H\033[2J"
cat << "EOF"





                    🟦🟦
         🟨🟨🟨🟨   🟦🟦


                              🟥🟥
                              🟥🟥
                  🟩🟩🟩
                    🟩       🟪🟪🟪
                               🟪
EOF
sleep 0.35

# Final frame: FOSC ASCII art + branding
printf "\033[H\033[2J"
echo -e "${BOLD}${CYAN}"
cat << "EOF"
    ███████╗ ██████╗ ███████╗ ██████╗
    ██╔════╝██╔═══██╗██╔════╝██╔════╝
    █████╗  ██║   ██║███████╗██║
    ██╔══╝  ██║   ██║╚════██║██║
    ██║     ╚██████╔╝███████║╚██████╗
    ╚═╝      ╚═════╝ ╚══════╝ ╚═════╝
EOF

echo -e "${RESET}${DIM}"
cat << "EOF"
    🟦🟦🟨🟨🟨🟨🟥🟥🟩🟩🟩🟪🟪🟪🟧🟧
    🟦🟦        🟥🟥  🟩  🟪  🟧🟧
EOF

echo -e "${RESET}${BOLD}${YELLOW}"
echo "         ★ Line Clear! ★"
echo -e "${RESET}${GREEN}         AIOS Core v2.1${RESET}"
echo ""
echo -e "${DIM}         AI-Orchestrated Full Stack${RESET}"
echo ""

# Show cursor
printf "\033[?25h"
