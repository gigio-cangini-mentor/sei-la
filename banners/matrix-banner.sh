#!/bin/bash
# Matrix ASCII Art Banner for Claude Code
# 10-frame animation: Green rain of characters → forms FOSC logo

GREEN='\033[0;32m'
BRIGHT_GREEN='\033[1;32m'
WHITE='\033[1;37m'
BLUE='\033[0;34m'
NC='\033[0m'

fosc_logo() {
echo ""
echo -e "${BRIGHT_GREEN}    ███████╗ ██████╗ ███████╗ ██████╗${NC}"
echo -e "${GREEN}    ██╔════╝██╔═══██╗██╔════╝██╔════╝${NC}"
echo -e "${BRIGHT_GREEN}    █████╗  ██║   ██║███████╗██║     ${NC}"
echo -e "${GREEN}    ██╔══╝  ██║   ██║╚════██║██║     ${NC}"
echo -e "${BRIGHT_GREEN}    ██║     ╚██████╔╝███████║╚██████╗${NC}"
echo -e "${GREEN}    ╚═╝      ╚═════╝ ╚══════╝ ╚═════╝${NC}"
echo ""
echo -e "${BRIGHT_GREEN}    ⌐ Wake up, coder... ¬${NC}  ${WHITE}AIOS Core ${GREEN}v2.1${NC}"
echo -e "${GREEN}    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
}

# Frame 1 - First drops
frame1() {
echo -e "${GREEN}"
cat << 'EOF'
    ア
         カ
                   タ
  サ
              マ
                        ハ
       ラ
                  ナ
                             ワ
    ヤ

EOF
echo -e "${NC}"
}

# Frame 2 - More rain
frame2() {
echo -e "${GREEN}"
cat << 'EOF'
    ア   キ              ツ
         カ        サ
    シ            タ    ヘ
  サ        ミ
     ユ        マ        ノ
                        ハ
       ラ    セ
           ネ      ナ
    ケ                      ワ
    ヤ        ソ        テ

EOF
echo -e "${NC}"
}

# Frame 3 - Dense rain
frame3() {
echo -e "${GREEN}"
cat << 'EOF'
    ア   キ   ス   ツ   テ   ト
    イ   カ   シ   チ   ナ   ニ
    ウ   ク   セ   タ   ヘ   ハ
    エ   コ   ミ   ソ   フ   ヒ
    オ   ユ   サ   マ   ホ   ノ
    カ   ケ   シ   メ   ハ   ヌ
    キ   ラ   セ   モ   ヒ   ネ
    ク   ネ   ソ   ナ   フ   ノ
    ケ   リ   タ   ニ   ヘ   ワ
    コ   ヤ   ソ   ヌ   テ   ン

EOF
echo -e "${NC}"
}

# Frame 4 - Very dense
frame4() {
echo -e "${BRIGHT_GREEN}"
cat << 'EOF'
  アキスツテトナニヌネノハヒフヘホマミ
  イカシチナニヌネノハヒフヘホマミムメ
  ウクセタヘハヒフヘホマミムメモヤユヨ
  エコミソフヒフヘホマミムメモヤユヨラ
  オユサマホノヌネノハヒフヘホマミムメ
  カケシメハヌネノハヒフヘホマミムメモ
  キラセモヒネノハヒフヘホマミムメモヤ
  クネソナフノハヒフヘホマミムメモヤユ
  ケリタニヘワンアイウエオカキクケコサ
  コヤソヌテンアイウエオカキクケコサシ

EOF
echo -e "${NC}"
}

# Frame 5 - Characters start clearing in pattern
frame5() {
echo -e "${BRIGHT_GREEN}"
cat << 'EOF'
  アキスツテトナニヌネノハヒフヘホマミ
  イカシチナニヌネノハヒフヘホマミムメ
  ウクセタヘハ      ヘホマミムメモヤユ
  エコミソフヒ      ホマミムメモヤユラ
  オユサマホノ      ハヒフヘホマミムメ
  カケシメハヌ      ヒフヘホマミムメモ
  キラセモヒネノハヒフヘホマミムメモヤ
  クネソナフノハヒフヘホマミムメモヤユ
  ケリタニヘワンアイウエオカキクケコサ
  コヤソヌテンアイウエオカキクケコサシ

EOF
echo -e "${NC}"
}

# Frame 6 - More clearing
frame6() {
echo -e "${BRIGHT_GREEN}"
cat << 'EOF'
  アキ  ツテ  ナニヌネ  ハヒフヘホマミ
  イカ  チナ  ヌネノハ  フヘホマミムメ
  ウク              ホ          モヤユ
  エコ              ミ          ヤユラ
  オユ              ヒ          ミムメ
  カケ              ヘ          ムメモ
  キラ  モヒ  ノハヒフ  ホマミムメモヤ
  クネ  ナフ  ハヒフヘ  マミムメモヤユ
  ケリ  ニヘ  ンアイウ  オカキクケコサ
  コヤ  ヌテ  アイウエ  カキクケコサシ

EOF
echo -e "${NC}"
}

# Frame 7 - Letters start forming FOSC
frame7() {
echo -e "${BRIGHT_GREEN}"
cat << 'EOF'

  ア      テ      ニヌ      ヒフヘホマ

  ███      █████     ███      █████
  █        █   █     █        █
  ███      █   █     ███      █
  █        █   █       █      █
  █        █████     ███      █████

  ケ      ニヘ      イウ      キクケコ

EOF
echo -e "${NC}"
}

# Frame 8 - FOSC clearer, rain fading
frame8() {
echo -e "${BRIGHT_GREEN}"
cat << 'EOF'

              テ            フヘ

  ███      █████     ███      █████
  █        █   █     █        █
  ███      █   █     ███      █
  █        █   █       █      █
  █        █████     ███      █████

              ヘ            ケコ

EOF
echo -e "${NC}"
}

# Frame 9 - FOSC clean
frame9() {
echo -e "${BRIGHT_GREEN}"
cat << 'EOF'



  ███████   ██████   ███████   ██████
  ██        ██   ██  ██        ██
  █████     ██   ██  ███████   ██
  ██        ██   ██       ██   ██
  ██        ██████   ███████   ██████



EOF
echo -e "${NC}"
}

# Frame 10 - FOSC glowing
frame10() {
echo -e "${BRIGHT_GREEN}"
cat << 'EOF'

  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·

  ███████   ██████   ███████   ██████
  ██        ██   ██  ██        ██
  █████     ██   ██  ███████   ██
  ██        ██   ██       ██   ██
  ██        ██████   ███████   ██████

  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·

EOF
echo -e "${NC}"
}

# Animation
printf "\033[?25l"

printf "\033[H\033[2J"; frame1; sleep 0.2
printf "\033[H\033[2J"; frame2; sleep 0.2
printf "\033[H\033[2J"; frame3; sleep 0.2
printf "\033[H\033[2J"; frame4; sleep 0.25
printf "\033[H\033[2J"; frame5; sleep 0.25
printf "\033[H\033[2J"; frame6; sleep 0.25
printf "\033[H\033[2J"; frame7; sleep 0.3
printf "\033[H\033[2J"; frame8; sleep 0.3
printf "\033[H\033[2J"; frame9; sleep 0.35
printf "\033[H\033[2J"; frame10; sleep 0.35

# Final
printf "\033[H\033[2J"
fosc_logo
printf "\033[?25h"
sleep 0.8
