#!/bin/bash
# Pac-Man ASCII Art Banner for Claude Code
# 10-frame animation: Pac-Man eats dots, encounters ghost, power pellet victory

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
WHITE='\033[1;37m'
NC='\033[0m'

fosc_logo() {
echo ""
echo -e "${YELLOW}    ███████╗ ██████╗ ███████╗ ██████╗${NC}"
echo -e "${YELLOW}    ██╔════╝██╔═══██╗██╔════╝██╔════╝${NC}"
echo -e "${YELLOW}    █████╗  ██║   ██║███████╗██║     ${NC}"
echo -e "${YELLOW}    ██╔══╝  ██║   ██║╚════██║██║     ${NC}"
echo -e "${YELLOW}    ██║     ╚██████╔╝███████║╚██████╗${NC}"
echo -e "${YELLOW}    ╚═╝      ╚═════╝ ╚══════╝ ╚═════╝${NC}"
echo ""
echo -e "${YELLOW}    ★ WAKA WAKA! ★${NC}  ${WHITE}AIOS Core ${GREEN}v2.1${NC}"
echo -e "${BLUE}    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
}

# Frame 1 - Pac-Man mouth open + 5 dots
frame1() {
cat << 'EOF'

       🟡🟡🟡🟡
     🟡🟡🟡🟡🟡🟡
    🟡🟡🟡🟡🟡
    🟡🟡🟡🟡              ⬜  ⬜  ⬜  ⬜  ⬜
    🟡🟡🟡🟡🟡
     🟡🟡🟡🟡🟡🟡
       🟡🟡🟡🟡

EOF
}

# Frame 2 - Pac-Man mouth closing
frame2() {
cat << 'EOF'

       🟡🟡🟡🟡
     🟡🟡🟡🟡🟡🟡
    🟡🟡🟡🟡🟡🟡
    🟡🟡🟡🟡🟡🟡          ⬜  ⬜  ⬜  ⬜  ⬜
    🟡🟡🟡🟡🟡🟡
     🟡🟡🟡🟡🟡🟡
       🟡🟡🟡🟡

EOF
}

# Frame 3 - Pac-Man open, ate 1 dot, moved right
frame3() {
cat << 'EOF'

          🟡🟡🟡🟡
        🟡🟡🟡🟡🟡🟡
       🟡🟡🟡🟡🟡
       🟡🟡🟡🟡                 ⬜  ⬜  ⬜  ⬜
       🟡🟡🟡🟡🟡
        🟡🟡🟡🟡🟡🟡
          🟡🟡🟡🟡

EOF
}

# Frame 4 - Pac-Man closed, ghost appears far right
frame4() {
cat << 'EOF'

            🟡🟡🟡🟡                          🟥🟥🟥
          🟡🟡🟡🟡🟡🟡                      🟥🟥🟥🟥🟥
         🟡🟡🟡🟡🟡🟡                      ⬜⬛🟥⬜⬛
         🟡🟡🟡🟡🟡🟡       ⬜  ⬜  ⬜    🟥🟥🟥🟥🟥
         🟡🟡🟡🟡🟡🟡                      🟥🟥🟥🟥🟥
          🟡🟡🟡🟡🟡🟡                      🟥⬛🟥⬛🟥
            🟡🟡🟡🟡

EOF
}

# Frame 5 - Pac-Man open, ghost closer
frame5() {
cat << 'EOF'

              🟡🟡🟡🟡                   🟥🟥🟥
            🟡🟡🟡🟡🟡🟡              🟥🟥🟥🟥🟥
           🟡🟡🟡🟡🟡                  ⬜⬛🟥⬜⬛
           🟡🟡🟡🟡        ⬜  🟠     🟥🟥🟥🟥🟥
           🟡🟡🟡🟡🟡                  🟥🟥🟥🟥🟥
            🟡🟡🟡🟡🟡🟡              🟥⬛🟥⬛🟥
              🟡🟡🟡🟡

EOF
}

# Frame 6 - Pac-Man eats power pellet! FLASH
frame6() {
cat << 'EOF'

                🟡🟡🟡🟡              🟥🟥🟥
              🟡🟡🟡🟡🟡🟡          🟥🟥🟥🟥🟥
             🟡🟡🟡🟡🟡              ⬜⬛🟥⬜⬛
             🟡🟡🟡🟡  ✨✨✨       🟥🟥🟥🟥🟥
             🟡🟡🟡🟡🟡              🟥🟥🟥🟥🟥
              🟡🟡🟡🟡🟡🟡          🟥⬛🟥⬛🟥
                🟡🟡🟡🟡

EOF
}

# Frame 7 - Ghost turns BLUE (scared!)
frame7() {
cat << 'EOF'

                🟡🟡🟡🟡              🟦🟦🟦
              🟡🟡🟡🟡🟡🟡          🟦🟦🟦🟦🟦
             🟡🟡🟡🟡🟡              ⬜⬜🟦⬜⬜
             🟡🟡🟡🟡                🟦🟦🟦🟦🟦
             🟡🟡🟡🟡🟡              🟦🟦🟦🟦🟦
              🟡🟡🟡🟡🟡🟡          🟦⬛🟦⬛🟦
                🟡🟡🟡🟡

EOF
}

# Frame 8 - Pac-Man chases ghost (reversed!)
frame8() {
cat << 'EOF'

                  🟡🟡🟡🟡        🟦🟦🟦
                🟡🟡🟡🟡🟡🟡    🟦🟦🟦🟦🟦
               🟡🟡🟡🟡🟡        ⬜⬜🟦⬜⬜
               🟡🟡🟡🟡          🟦🟦🟦🟦🟦
               🟡🟡🟡🟡🟡        🟦🟦🟦🟦🟦
                🟡🟡🟡🟡🟡🟡    🟦⬛🟦⬛🟦
                  🟡🟡🟡🟡

EOF
}

# Frame 9 - Pac-Man eats ghost! "200"
frame9() {
cat << 'EOF'

                      🟡🟡🟡🟡
                    🟡🟡🟡🟡🟡🟡
                   🟡🟡🟡🟡🟡        ✨
                   🟡🟡🟡🟡        ２００
                   🟡🟡🟡🟡🟡        ✨
                    🟡🟡🟡🟡🟡🟡
                      🟡🟡🟡🟡

EOF
}

# Frame 10 - Victory!
frame10() {
cat << 'EOF'

                         🟡🟡🟡🟡
                       🟡🟡🟡🟡🟡🟡
                      🟡🟡🟡🟡🟡🟡🟡
                      🟡🟡🟡🟡🟡🟡🟡
                      🟡🟡🟡🟡🟡🟡🟡
                       🟡🟡🟡🟡🟡🟡
                         🟡🟡🟡🟡
                     ✨  ✨  ✨  ✨  ✨

EOF
}

# Animation
printf "\033[?25l"

printf "\033[H\033[2J"; frame1; sleep 0.25
printf "\033[H\033[2J"; frame2; sleep 0.2
printf "\033[H\033[2J"; frame3; sleep 0.25
printf "\033[H\033[2J"; frame4; sleep 0.3
printf "\033[H\033[2J"; frame5; sleep 0.3
printf "\033[H\033[2J"; frame6; sleep 0.15
printf "\033[H\033[2J"; frame7; sleep 0.3
printf "\033[H\033[2J"; frame8; sleep 0.25
printf "\033[H\033[2J"; frame9; sleep 0.35
printf "\033[H\033[2J"; frame10; sleep 0.3

# Final
printf "\033[H\033[2J"
fosc_logo
printf "\033[?25h"
sleep 0.8
