#!/bin/bash
# Pokémon ASCII Art Banner for Claude Code
# 10-frame animation: Pokéball throw → open → Pikachu appears

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
WHITE='\033[1;37m'
NC='\033[0m'

fosc_logo() {
echo ""
echo -e "${RED}    ███████╗ ██████╗ ███████╗ ██████╗${NC}"
echo -e "${RED}    ██╔════╝██╔═══██╗██╔════╝██╔════╝${NC}"
echo -e "${RED}    █████╗  ██║   ██║███████╗██║     ${NC}"
echo -e "${RED}    ██╔══╝  ██║   ██║╚════██║██║     ${NC}"
echo -e "${RED}    ██║     ╚██████╔╝███████║╚██████╗${NC}"
echo -e "${RED}    ╚═╝      ╚═════╝ ╚══════╝ ╚═════╝${NC}"
echo ""
echo -e "${YELLOW}    ⚡ Gotta code 'em all! ⚡${NC}  ${WHITE}AIOS Core ${GREEN}v2.1${NC}"
echo -e "${BLUE}    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
}

# Frame 1 - Pokéball flying (high, left)
frame1() {
cat << 'EOF'


          🟥🟥🟥
        🟥🟥🟥🟥🟥
        ⬛⬛⬛⬛⬛
        ⬜⬜⬜⬜⬜
          ⬜⬜⬜




EOF
}

# Frame 2 - Pokéball flying (mid)
frame2() {
cat << 'EOF'



              🟥🟥🟥
            🟥🟥🟥🟥🟥
            ⬛⬛⬛⬛⬛
            ⬜⬜⬜⬜⬜
              ⬜⬜⬜



EOF
}

# Frame 3 - Pokéball flying (center, lower)
frame3() {
cat << 'EOF'




                  🟥🟥🟥
                🟥🟥🟥🟥🟥
                ⬛⬛⬛⬛⬛
                ⬜⬜⬜⬜⬜
                  ⬜⬜⬜


EOF
}

# Frame 4 - Pokéball landing (center)
frame4() {
cat << 'EOF'




                    🟥🟥🟥🟥
                  🟥🟥🟥🟥🟥🟥
                  🟥🟥🟥🟥🟥🟥
                  ⬛⬛⬜⬛⬛⬛
                  ⬜⬜⬜⬜⬜⬜
                  ⬜⬜⬜⬜⬜⬜
                    ⬜⬜⬜⬜

EOF
}

# Frame 5 - Pokéball shaking left
frame5() {
cat << 'EOF'




                  🟥🟥🟥🟥
                🟥🟥🟥🟥🟥🟥
                🟥🟥🟥🟥🟥🟥
            ✨  ⬛⬛⬜⬛⬛⬛
                ⬜⬜⬜⬜⬜⬜
                ⬜⬜⬜⬜⬜⬜
                  ⬜⬜⬜⬜

EOF
}

# Frame 6 - Pokéball shaking right
frame6() {
cat << 'EOF'




                      🟥🟥🟥🟥
                    🟥🟥🟥🟥🟥🟥
                    🟥🟥🟥🟥🟥🟥
                    ⬛⬛⬜⬛⬛⬛  ✨
                    ⬜⬜⬜⬜⬜⬜
                    ⬜⬜⬜⬜⬜⬜
                      ⬜⬜⬜⬜

EOF
}

# Frame 7 - Pokéball OPENING! Flash!
frame7() {
cat << 'EOF'


                  ✨  ✨  ✨  ✨
              ✨                    ✨
                    🟥🟥🟥🟥
                  🟥🟥🟥🟥🟥🟥
              ✨  ⬛⬛⬜⬛⬛⬛  ✨
                  ⬜⬜⬜⬜⬜⬜
                    ⬜⬜⬜⬜
              ✨                    ✨
                  ✨  ✨  ✨  ✨

EOF
}

# Frame 8 - White flash (full bright)
frame8() {
cat << 'EOF'


            ✨  ✨  ✨  ✨  ✨  ✨  ✨

          ✨  ✨  ✨  ✨  ✨  ✨  ✨  ✨

            ✨  ✨  ✨  ✨  ✨  ✨  ✨

          ✨  ✨  ✨  ✨  ✨  ✨  ✨  ✨

            ✨  ✨  ✨  ✨  ✨  ✨  ✨


EOF
}

# Frame 9 - Pikachu appears!
frame9() {
cat << 'EOF'

                  ⬛🟡            🟡⬛
                  ⬛🟡🟡        🟡🟡⬛
                    ⬛🟡🟡🟡🟡🟡🟡⬛
                  ⬛🟡🟡🟡🟡🟡🟡🟡🟡⬛
                  ⬛🟡⬛⬜🟡🟡⬜⬛🟡⬛
                  ⬛🟡🟡🟡⬛⬛🟡🟡🟡⬛
                  ⬛🟡🟥🟡🟡🟡🟡🟥🟡⬛
                    ⬛🟡🟡🟡🟡🟡🟡⬛
                      ⬛🟡🟡🟡🟡⬛
                    ⬛🟡🟡🟡🟡🟡🟡⬛

EOF
}

# Frame 10 - Pikachu ready! Sparks!
frame10() {
cat << 'EOF'

              ⚡  ⬛🟡            🟡⬛
                  ⬛🟡🟡        🟡🟡⬛  ⚡
                    ⬛🟡🟡🟡🟡🟡🟡⬛
                  ⬛🟡🟡🟡🟡🟡🟡🟡🟡⬛
                  ⬛🟡⬛⬜🟡🟡⬜⬛🟡⬛
              ⚡  ⬛🟡🟡🟡⬛⬛🟡🟡🟡⬛
                  ⬛🟡🟥🟡🟡🟡🟡🟥🟡⬛  ⚡
                    ⬛🟡🟡🟡🟡🟡🟡⬛
                      ⬛🟡🟡🟡🟡⬛
                    ⬛🟡🟡🟡🟡🟡🟡⬛

EOF
}

# Animation
printf "\033[?25l"

printf "\033[H\033[2J"; frame1; sleep 0.15
printf "\033[H\033[2J"; frame2; sleep 0.15
printf "\033[H\033[2J"; frame3; sleep 0.15
printf "\033[H\033[2J"; frame4; sleep 0.4
printf "\033[H\033[2J"; frame5; sleep 0.25
printf "\033[H\033[2J"; frame6; sleep 0.25
printf "\033[H\033[2J"; frame7; sleep 0.3
printf "\033[H\033[2J"; frame8; sleep 0.15
printf "\033[H\033[2J"; frame9; sleep 0.4
printf "\033[H\033[2J"; frame10; sleep 0.35

# Final
printf "\033[H\033[2J"
fosc_logo
printf "\033[?25h"
sleep 0.8
