#!/bin/bash
# Mega Man ASCII Art Banner for Claude Code
# 9-frame animation: Teleport beam → materialize → landing → arm cannon ready!

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
WHITE='\033[1;37m'
NC='\033[0m'

fosc_logo() {
echo ""
echo -e "${CYAN}    ███████╗ ██████╗ ███████╗ ██████╗${NC}"
echo -e "${CYAN}    ██╔════╝██╔═══██╗██╔════╝██╔════╝${NC}"
echo -e "${BLUE}    █████╗  ██║   ██║███████╗██║     ${NC}"
echo -e "${BLUE}    ██╔══╝  ██║   ██║╚════██║██║     ${NC}"
echo -e "${CYAN}    ██║     ╚██████╔╝███████║╚██████╗${NC}"
echo -e "${CYAN}    ╚═╝      ╚═════╝ ╚══════╝ ╚═════╝${NC}"
echo ""
echo -e "${CYAN}    ◆ READY! ◆${NC}  ${WHITE}AIOS Core ${GREEN}v2.1${NC}"
echo -e "${BLUE}    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
}

# Frame 1 - Beam from sky (thin)
frame1() {
cat << 'EOF'

                      ⬜
                      ⬜
                      ⬜
                      ⬜
                      ⬜
                      ⬜
                      ⬜
                      ⬜
                      ⬜
                      ⬜

EOF
}

# Frame 2 - Beam wider
frame2() {
cat << 'EOF'

                    ⬜⬜⬜
                    ⬜🟦⬜
                    ⬜🟦⬜
                    ⬜🟦⬜
                    ⬜🟦⬜
                    ⬜🟦⬜
                    ⬜🟦⬜
                    ⬜🟦⬜
                    ⬜🟦⬜
                    ⬜⬜⬜

EOF
}

# Frame 3 - Beam pulsing
frame3() {
cat << 'EOF'

                  ✨⬜🟦⬜✨
                    ⬜🟦⬜
                  ✨⬜🟦⬜✨
                    ⬜🟦⬜
                  ✨⬜🟦⬜✨
                    ⬜🟦⬜
                  ✨⬜🟦⬜✨
                    ⬜🟦⬜
                  ✨⬜🟦⬜✨
                    ⬜⬜⬜

EOF
}

# Frame 4 - Shape forming in beam
frame4() {
cat << 'EOF'

                    ⬜🟦⬜
                    ⬜🟦⬜
                    ⬜🟦⬜
                   ⬛⬜🟦⬜⬛
                   ⬛⬜🟦⬜⬛
                    ⬛🟦🟦⬛
                    ⬜🟦⬜
                    ⬜🟦⬜
                   ⬛⬜⬜⬜⬛
                    ⬜⬜⬜

EOF
}

# Frame 5 - Mega Man materializing!
frame5() {
cat << 'EOF'

                    ⬜⬜⬜
                  ⬜⬛🟦🟦🟦⬛⬜
                 ⬜⬛🟦🟦🟦🟦🟦⬛⬜
                  ⬛🟦🟦🟦🟦🟦⬛
                  ⬛🟨⬛⬜⬛🟨⬛
                   ⬛🟨🟨🟨🟨⬛
                  ⬛🟦🟦🟦🟦🟦⬛
                  ⬛🟦🟦⬛🟦🟦⬛
                  ⬛🟦⬛⬛⬛🟦⬛
                  ⬛🟦⬛  ⬛🟦⬛

EOF
}

# Frame 6 - Mega Man SOLID! Landing pose
frame6() {
cat << 'EOF'

                    ⬛⬛⬛
                  ⬛🟦🟦🟦⬛
                 ⬛🟦🟦🟦🟦🟦⬛
                  ⬛🟦🟦🟦🟦🟦⬛
                  ⬛🟨⬛⬜⬛🟨⬛
                   ⬛🟨🟨🟨🟨⬛
                  ⬛🟦🟦🟦🟦🟦⬛
                  ⬛🟦🟦⬛🟦🟦⬛
                  ⬛🟦⬛⬛⬛🟦⬛
                 ⬛🟦🟦⬛⬛🟦🟦⬛

EOF
}

# Frame 7 - Mega Man standing tall
frame7() {
cat << 'EOF'

                    ⬛⬛⬛
                  ⬛🟦🟦🟦⬛
                 ⬛🟦🟦🟦🟦🟦⬛
                  ⬛🟦🟦🟦🟦🟦⬛
                  ⬛🟨⬛⬜⬛🟨⬛
                   ⬛🟨🟨🟨🟨⬛
               ⬛⬛🟦🟦🟦🟦🟦⬛⬛
              ⬛🟦🟦🟦🟦⬛🟦🟦🟦⬛
                  ⬛🟦⬛⬛⬛🟦⬛
                 ⬛🟦🟦⬛⬛🟦🟦⬛

EOF
}

# Frame 8 - Arm cannon CHARGING!
frame8() {
cat << 'EOF'

                    ⬛⬛⬛
                  ⬛🟦🟦🟦⬛
                 ⬛🟦🟦🟦🟦🟦⬛
                  ⬛🟦🟦🟦🟦🟦⬛
                  ⬛🟨⬛⬜⬛🟨⬛
                   ⬛🟨🟨🟨🟨⬛
               ⬛⬛🟦🟦🟦🟦🟦⬛⬛
              ⬛🟦🟦🟦🟦⬛🟦🟦🟦⬛
            ✨⬛🟦🟦⬛⬛⬛⬛🟦⬛
                 ⬛🟦🟦⬛⬛🟦🟦⬛

EOF
}

# Frame 9 - MEGA BUSTER FIRE!
frame9() {
cat << 'EOF'

                    ⬛⬛⬛
                  ⬛🟦🟦🟦⬛
                 ⬛🟦🟦🟦🟦🟦⬛
                  ⬛🟦🟦🟦🟦🟦⬛
                  ⬛🟨⬛⬜⬛🟨⬛
                   ⬛🟨🟨🟨🟨⬛
               ⬛⬛🟦🟦🟦🟦🟦⬛⬛
              ⬛🟦🟦🟦🟦⬛🟦🟦🟦⬛
    🟡🟡🟡✨⬛🟦🟦⬛⬛⬛⬛🟦⬛
                 ⬛🟦🟦⬛⬛🟦🟦⬛

EOF
}

# Animation
printf "\033[?25l"

printf "\033[H\033[2J"; frame1; sleep 0.15
printf "\033[H\033[2J"; frame2; sleep 0.15
printf "\033[H\033[2J"; frame3; sleep 0.2
printf "\033[H\033[2J"; frame4; sleep 0.25
printf "\033[H\033[2J"; frame5; sleep 0.25
printf "\033[H\033[2J"; frame6; sleep 0.3
printf "\033[H\033[2J"; frame7; sleep 0.3
printf "\033[H\033[2J"; frame8; sleep 0.35
printf "\033[H\033[2J"; frame9; sleep 0.4

# Final
printf "\033[H\033[2J"
fosc_logo
printf "\033[?25h"
sleep 0.8
