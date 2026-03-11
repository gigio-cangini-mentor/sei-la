#!/bin/bash
# Space Invaders ASCII Art Banner for Claude Code
# 10-frame animation: Aliens march → ship fires → aliens explode

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
WHITE='\033[1;37m'
MAGENTA='\033[0;35m'
NC='\033[0m'

fosc_logo() {
echo ""
echo -e "${GREEN}    ███████╗ ██████╗ ███████╗ ██████╗${NC}"
echo -e "${GREEN}    ██╔════╝██╔═══██╗██╔════╝██╔════╝${NC}"
echo -e "${GREEN}    █████╗  ██║   ██║███████╗██║     ${NC}"
echo -e "${GREEN}    ██╔══╝  ██║   ██║╚════██║██║     ${NC}"
echo -e "${GREEN}    ██║     ╚██████╔╝███████║╚██████╗${NC}"
echo -e "${GREEN}    ╚═╝      ╚═════╝ ╚══════╝ ╚═════╝${NC}"
echo ""
echo -e "${CYAN}    ◄► INSERT COIN ◄►${NC}  ${WHITE}AIOS Core ${GREEN}v2.1${NC}"
echo -e "${GREEN}    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
}

# Frame 1 - Aliens formation (position 1)
frame1() {
cat << 'EOF'

      👾  👾  👾  👾  👾  👾  👾
       🟪  🟪  🟪  🟪  🟪  🟪
      👾  👾  👾  👾  👾  👾  👾
       🟩  🟩  🟩  🟩  🟩  🟩



                    🔺
                  🟦🟦🟦
              ━━━━━━━━━━━━━━━

EOF
}

# Frame 2 - Aliens move right
frame2() {
cat << 'EOF'

        👾  👾  👾  👾  👾  👾  👾
         🟪  🟪  🟪  🟪  🟪  🟪
        👾  👾  👾  👾  👾  👾  👾
         🟩  🟩  🟩  🟩  🟩  🟩



                    🔺
                  🟦🟦🟦
              ━━━━━━━━━━━━━━━

EOF
}

# Frame 3 - Aliens move down + left
frame3() {
cat << 'EOF'


      👾  👾  👾  👾  👾  👾  👾
       🟪  🟪  🟪  🟪  🟪  🟪
      👾  👾  👾  👾  👾  👾  👾
       🟩  🟩  🟩  🟩  🟩  🟩



                    🔺
                  🟦🟦🟦
              ━━━━━━━━━━━━━━━

EOF
}

# Frame 4 - Ship fires!
frame4() {
cat << 'EOF'


      👾  👾  👾  👾  👾  👾  👾
       🟪  🟪  🟪  🟪  🟪  🟪
      👾  👾  👾  👾  👾  👾  👾
       🟩  🟩  🟩  🟩  🟩  🟩
                    ⬜
                    ⬜
                    ⬜
                    🔺
                  🟦🟦🟦
              ━━━━━━━━━━━━━━━

EOF
}

# Frame 5 - Laser hits! Alien explodes!
frame5() {
cat << 'EOF'


      👾  👾  👾  👾  👾  👾  👾
       🟪  🟪  🟪  🟪  🟪  🟪
      👾  👾  👾  ✨  👾  👾  👾
       🟩  🟩  🟩  🟩  🟩  🟩


                    🔺
                  🟦🟦🟦
              ━━━━━━━━━━━━━━━

EOF
}

# Frame 6 - More shooting! Two aliens down
frame6() {
cat << 'EOF'


      👾  👾  👾  👾  👾  👾  👾
       🟪  🟪  🟪  🟪  🟪  🟪
      👾  👾  👾      👾  👾  👾
       🟩  🟩  🟩  🟩  🟩  🟩
              ⬜
              ⬜
              ⬜
              🔺
            🟦🟦🟦
              ━━━━━━━━━━━━━━━

EOF
}

# Frame 7 - Chain explosions!
frame7() {
cat << 'EOF'


      👾  👾  ✨  👾  👾  👾  👾
       🟪  🟪      🟪  🟪  🟪
      👾  ✨  👾      👾  👾  👾
       🟩  🟩  🟩  🟩  🟩  🟩


              🔺
            🟦🟦🟦
              ━━━━━━━━━━━━━━━

EOF
}

# Frame 8 - Almost all destroyed!
frame8() {
cat << 'EOF'


      👾      ✨      ✨  👾  ✨
       🟪          🟪      🟪
      ✨  ✨  👾      ✨  👾  ✨
           🟩  🟩      🟩


                    🔺
                  🟦🟦🟦
              ━━━━━━━━━━━━━━━

EOF
}

# Frame 9 - Last alien!
frame9() {
cat << 'EOF'




                       👾


                    ⬜
                    ⬜
                    ⬜
                    🔺
                  🟦🟦🟦
              ━━━━━━━━━━━━━━━

EOF
}

# Frame 10 - Victory! All clear!
frame10() {
cat << 'EOF'




                       ✨


              ✨  ✨  ✨  ✨  ✨  ✨

                    🔺
                  🟦🟦🟦
              ━━━━━━━━━━━━━━━

EOF
}

# Animation
printf "\033[?25l"

printf "\033[H\033[2J"; frame1; sleep 0.3
printf "\033[H\033[2J"; frame2; sleep 0.3
printf "\033[H\033[2J"; frame3; sleep 0.3
printf "\033[H\033[2J"; frame4; sleep 0.2
printf "\033[H\033[2J"; frame5; sleep 0.2
printf "\033[H\033[2J"; frame6; sleep 0.2
printf "\033[H\033[2J"; frame7; sleep 0.2
printf "\033[H\033[2J"; frame8; sleep 0.25
printf "\033[H\033[2J"; frame9; sleep 0.3
printf "\033[H\033[2J"; frame10; sleep 0.3

# Final
printf "\033[H\033[2J"
fosc_logo
printf "\033[?25h"
sleep 0.8
