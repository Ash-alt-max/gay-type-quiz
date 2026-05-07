import { Component, signal, computed } from '@angular/core';

interface Answer {
  text: string;
  scores: Partial<Record<string, number>>;
}

interface Question {
  id: number;
  question: string;
  answers: Answer[];
}

interface Character {
  id: string;
  name: string;
  nameTh: string;
  role: string;
  description: string;
  color: string;
  accentColor: string;
  emoji: string;
  image: string;
  traits: string[];
  funFact: string;
}

const CHARACTERS: Character[] = [
  {
    id: 'twink',
    name: 'Twink',
    nameTh: 'ทวิงค์',
    role: 'นักแฟชั่นผู้สง่างาม',
    description:
      'คุณคือจิตวิญญาณแห่งยุคสมัย สไตล์คุณพูดแทนตัวคุณได้ก่อนที่คุณจะเอ่ยปาก ชอบอัพเดทเทรนด์ รักการถ่ายรูป และเป็นคนแรกในกลุ่มที่จะบอกว่า "อันนี้ outdated แล้วนะ" ใครได้เดทกับคุณต้องพร้อมไปคิวยาวร้านดังด้วยกัน',
    color: '#e879b8',
    accentColor: '#9b2d6e',
    emoji: '✨',
    image: 'images/twink.svg',
    traits: ['สไตลิสต์', 'เซลฟี่เก่ง', 'ตามเทรนด์', 'โซเชียลดี'],
    funFact: 'ฟีด IG ของคุณสวยกว่าของคนส่วนใหญ่',
  },
  {
    id: 'bear',
    name: 'Bear',
    nameTh: 'แบร์',
    role: 'อบอุ่นเหมือนหมีกอด',
    description:
      'คุณคือพลังงานแห่งความอบอุ่น คนรอบข้างรู้สึกปลอดภัยเมื่ออยู่ใกล้คุณ ชอบกินของอร่อย ดูซีรีส์ และกอดแน่นๆ เดทในฝันของคุณคือนั่งดูหนังที่บ้านพร้อมพิซซ่า ไม่จำเป็นต้องออกไปไหน ขอแค่ได้อยู่ด้วยกัน',
    color: '#d4883a',
    accentColor: '#7a4810',
    emoji: '🐻',
    image: 'images/bear.svg',
    traits: ['อบอุ่น', 'ใจดี', 'ชอบกินของอร่อย', 'กอดเก่ง'],
    funFact: 'คนรอบข้างมักบอกว่ากอดคุณแล้วไม่อยากปล่อย',
  },
  {
    id: 'daddy',
    name: 'Daddy',
    nameTh: 'แดดดี้',
    role: 'ผู้ใหญ่ผู้สง่าผ่าเผย',
    description:
      'คุณคือความมั่นใจที่เดินได้ มีเสน่ห์แบบที่ไม่ต้องพยายาม คนอื่นรู้สึกปลอดภัยและได้รับการดูแลเมื่ออยู่กับคุณ ชอบสิ่งดีๆ ในชีวิต บาร์ดีๆ ไวน์ดีๆ และบทสนทนาที่มีความหมาย',
    color: '#5c8ed4',
    accentColor: '#1a3a6e',
    emoji: '👔',
    image: 'images/daddy.svg',
    traits: ['มั่นใจ', 'ดูแลคนอื่น', 'มีรสนิยม', 'มีเสน่ห์'],
    funFact: 'คุณทำให้ทุกคนในห้องรู้สึกว่าตัวเองมีคุณค่า',
  },
  {
    id: 'otter',
    name: 'Otter',
    nameTh: 'ออตเตอร์',
    role: 'นักกีฬาผู้กระฉับกระเฉง',
    description:
      'คุณคือพลังงานที่ไม่มีวันหมด รักการเคลื่อนไหว ชอบออกกำลังกาย และมีสุขภาพดีเป็นไลฟ์สไตล์ ไม่ใช่แค่งานอดิเรก เดทในฝันคือวิ่งด้วยกันตอนเช้า แล้วกินบรันช์ที่ดีที่สุดในเมือง',
    color: '#42b89a',
    accentColor: '#0d6b56',
    emoji: '🦦',
    image: 'images/otter.svg',
    traits: ['แอคทีฟ', 'สุขภาพดี', 'กระฉับกระเฉง', 'ชอบผจญภัย'],
    funFact: 'Playlist ออกกำลังกายของคุณน่าจะดีมาก',
  },
  {
    id: 'femme',
    name: 'Femme',
    nameTh: 'เฟม',
    role: 'นักแสดงผู้เปี่ยมเสน่ห์',
    description:
      'คุณคือดาวเด่นในทุกห้องที่เดินเข้าไป ไม่กลัวการแสดงออก รักความงาม และมีพลังงานที่ดึงดูดทุกสายตา ดราม่านิดๆ คือเครื่องเทศที่ทำให้ชีวิตมีรส และคุณก็รู้ดี',
    color: '#e85858',
    accentColor: '#8b1a1a',
    emoji: '💄',
    image: 'images/femme.svg',
    traits: ['โดดเด่น', 'แสดงออก', 'รักความงาม', 'เสน่ห์เกิน'],
    funFact: 'คุณเป็นคนที่ทุกคนจำได้หลังจากพบครั้งแรก',
  },
  {
    id: 'masc',
    name: 'Masc',
    nameTh: 'มาสค์',
    role: 'ชายชาตรีผู้เงียบงัน',
    description:
      'คุณคือความลึกที่ต้องใช้เวลาค้นพบ ดูเย็นชาภายนอกแต่ภายในอัดแน่นไปด้วยความรู้สึก ไม่ชอบโชว์มากแต่เมื่อแสดงออกแต่ละครั้งมีความหมาย คนที่อยู่ใกล้คุณรู้ว่าได้รับสิ่งพิเศษ',
    color: '#6b8c5e',
    accentColor: '#2a4020',
    emoji: '🌲',
    image: 'images/masc.svg',
    traits: ['เก็บตัว', 'ตรงไปตรงมา', 'มั่นคง', 'ลึก'],
    funFact: 'คนที่คุณเลือกแชทด้วยรู้สึกพิเศษมากเพราะมีไม่กี่คน',
  },
];

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: 'วันหยุดในฝันของคุณคืออะไร?',
    answers: [
      { text: 'ช็อปปิ้งทั้งวัน ถ่ายรูปลงสตอรี่ ดินเนอร์ร้านใหม่ที่เปิดล่าสุด', scores: { twink: 3, femme: 1 } },
      { text: 'นอนตื่นสาย กินบรันช์อร่อยๆ อยู่บ้านดูซีรีส์ทั้งวัน', scores: { bear: 3, masc: 1 } },
      { text: 'ไปสปา นั่งในคาเฟ่เงียบๆ วางแผนชีวิตพักใหญ่', scores: { daddy: 3, masc: 1 } },
      { text: 'ไปเดินป่า ตั้งแคมป์ หรือขี่จักรยานรอบเมือง', scores: { otter: 3, masc: 1 } },
      { text: 'ดูคอนเสิร์ต ไปงานศิลปะ หรือดูละครเวที', scores: { femme: 3, twink: 1 } },
      { text: 'เล่นเกม ดูบอล หรือออกกำลังกายในยิม', scores: { masc: 3, otter: 1 } },
    ],
  },
  {
    id: 2,
    question: 'แอปที่คุณเปิดก่อนเลยตอนตื่นนอน?',
    answers: [
      { text: 'Instagram — เช็คว่าใครไลก์รูปเมื่อคืน', scores: { twink: 3, femme: 1 } },
      { text: 'กลุ่มไลน์ที่เพื่อนรัวส่งมีม', scores: { bear: 3, otter: 1 } },
      { text: 'ข่าว หรือแอปการเงิน ดูพอร์ตก่อนเลย', scores: { daddy: 3, masc: 1 } },
      { text: 'Strava หรือ Health App ดูว่าวันนี้จะวิ่งกี่โล', scores: { otter: 3, masc: 1 } },
      { text: 'TikTok — scroll จนสาย แต่ก็ยังทำ', scores: { femme: 3, twink: 1 } },
      { text: 'ไม่ได้เปิดอะไร แค่ลุกไปชงกาแฟก่อนเลย', scores: { masc: 3, daddy: 1 } },
    ],
  },
  {
    id: 3,
    question: 'ถ้าต้องพาเดทครั้งแรก คุณจะพาไปไหน?',
    answers: [
      { text: 'ร้านอาหารญี่ปุ่น omakase ที่จองยากมาก', scores: { twink: 3, daddy: 1 } },
      { text: 'ร้านหม้อไฟบรรยากาศดี กินเยอะ คุยเยอะ', scores: { bear: 3, otter: 1 } },
      { text: 'บาร์ค็อกเทลเปิดใหม่ ดนตรีสด บรรยากาศดี', scores: { daddy: 3, femme: 1 } },
      { text: 'ปั่นจักรยาน แล้วหาร้านอาหารข้างทางกิน', scores: { otter: 3, masc: 1 } },
      { text: 'ดูงาน art exhibition ต่อด้วยอาหารค่ำสวยๆ', scores: { femme: 3, twink: 1 } },
      { text: 'เดินเล่นในสวน คุยกันเรียบง่ายๆ ไม่ต้องหรูหรา', scores: { masc: 3, bear: 1 } },
    ],
  },
  {
    id: 4,
    question: 'เวลาเจอคนที่น่าสนใจ คุณจะทำอะไร?',
    answers: [
      { text: 'ส่ง follow IG ก่อน ดู aesthetic เขาก่อนตัดสินใจ', scores: { twink: 3, femme: 1 } },
      { text: 'รอให้เขามาคุยก่อน แต่ถ้ามาก็ยิ้มรับแน่นอน', scores: { bear: 3, masc: 1 } },
      { text: 'เดินเข้าไปแนะนำตัวตรงๆ มั่นใจ ไม่รีรอ', scores: { daddy: 3, otter: 1 } },
      { text: 'ชวนไปทำกิจกรรมด้วยกันเลย เช่น วิ่ง หรือเล่นสปอร์ต', scores: { otter: 3, masc: 1 } },
      { text: 'แสดงให้เขาสังเกตเห็นก่อน ทำตัวน่าสนใจ', scores: { femme: 3, twink: 1 } },
      { text: 'สังเกตอยู่ห่างๆ ก่อน ถ้าสนใจจริงค่อยคุย', scores: { masc: 3, daddy: 1 } },
    ],
  },
  {
    id: 5,
    question: 'คุณเป็นคนยังไงในกลุ่มเพื่อน?',
    answers: [
      { text: 'คนที่รู้ว่าร้านไหนเปิดใหม่ ต้องถามฉัน', scores: { twink: 3, femme: 1 } },
      { text: 'คนที่ทุกคนโทรหาตอนเครียด เพราะฉันฟังดี', scores: { bear: 3, daddy: 1 } },
      { text: 'คนที่จ่ายบิลแล้วค่อยเก็บทีหลัง เพราะไว้ใจได้', scores: { daddy: 3, masc: 1 } },
      { text: 'คนที่ชวนไปทำ activity ทุกสัปดาห์ ไม่ยอมหยุดนิ่ง', scores: { otter: 3, twink: 1 } },
      { text: 'คนที่ทำให้ทุก outing กลายเป็น main character moment', scores: { femme: 3, twink: 1 } },
      { text: 'คนที่ไม่ได้อยู่ทุกงาน แต่เวลามาทุกคนดีใจ', scores: { masc: 3, bear: 1 } },
    ],
  },
  {
    id: 6,
    question: 'ซีรีส์หรือหนังประเภทไหนที่คุณดูซ้ำได้เรื่อยๆ?',
    answers: [
      { text: 'Reality TV แฟชั่น หรือ lifestyle content', scores: { twink: 3, femme: 1 } },
      { text: 'ซีรีส์ครอบครัว อบอุ่น หรือ slice of life', scores: { bear: 3, masc: 1 } },
      { text: 'หนังสายเนิบ มีความหมายลึกซึ้ง หรือ thriller', scores: { daddy: 3, masc: 1 } },
      { text: 'หนังแอ็คชัน ผจญภัย หรือสารคดีธรรมชาติ', scores: { otter: 3, masc: 1 } },
      { text: 'มิวสิคัล บรอดเวย์ หรือซีรีส์ดราม่าเข้มข้น', scores: { femme: 3, twink: 1 } },
      { text: 'หนัง sci-fi เงียบๆ หรือดูอะไรก็ได้ขอแค่ไม่มีดราม่า', scores: { masc: 3, otter: 1 } },
    ],
  },
  {
    id: 7,
    question: 'เพื่อนคุณมักบอกว่าคุณเป็นคนแบบไหน?',
    answers: [
      { text: '"แต่งตัวดีที่สุดในกลุ่ม และรู้เรื่องนี้ดี"', scores: { twink: 3, femme: 1 } },
      { text: '"อบอุ่น เชื่อถือได้ เหมือนผ้าห่มที่ไว้ใจได้"', scores: { bear: 3, daddy: 1 } },
      { text: '"เท่ สุขุม พูดน้อยแต่ทุกคำมีความหมาย"', scores: { daddy: 3, masc: 1 } },
      { text: '"energetic มาก อยู่คนเดียวไม่เป็นเลย"', scores: { otter: 3, twink: 1 } },
      { text: '"ดราม่านิดหน่อย แต่ชีวิตขาดคุณไม่ได้"', scores: { femme: 3, bear: 1 } },
      { text: '"ลึกลับ เข้าถึงยาก แต่ถ้าได้เพื่อนคุณคือ loyal มาก"', scores: { masc: 3, daddy: 1 } },
    ],
  },
  {
    id: 8,
    question: 'สิ่งที่ต้องมีก่อนออกจากบ้านทุกครั้ง?',
    answers: [
      { text: 'แต่งหน้า เซ็ตผม ถ่ายรูป OOTD ก่อนออก', scores: { twink: 3, femme: 1 } },
      { text: 'กาแฟและของว่าง เพราะหิวก็ไม่มีความสุข', scores: { bear: 3, otter: 1 } },
      { text: 'นาฬิกา กระเป๋าหนัง และ check อีเมลสักรอบ', scores: { daddy: 3, masc: 1 } },
      { text: 'AirPods ชาร์จเต็ม และรองเท้าสำหรับวิ่ง', scores: { otter: 3, twink: 1 } },
      { text: 'เลือก look ให้ match กับ mood วันนี้ก่อนแล้วค่อยออก', scores: { femme: 3, twink: 1 } },
      { text: 'โทรศัพท์ กุญแจ กระเป๋าสตางค์ เท่านั้น', scores: { masc: 3, bear: 1 } },
    ],
  },
];

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [],
  templateUrl: './quiz.html',
  styleUrl: './quiz.scss',
})
export class QuizComponent {
  readonly questions = QUESTIONS;
  readonly characters = CHARACTERS;
  readonly answerIcons = ['💅', '🍕', '🔥', '🦦', '👑', '🏔️'];

  readonly starPositions = Array.from({ length: 60 });
  readonly starStyles = this.starPositions.map(() => {
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const size = Math.random() * 2 + 1;
    const delay = Math.random() * 5;
    const duration = Math.random() * 3 + 2;
    return `left:${x}%;top:${y}%;width:${size}px;height:${size}px;animation-delay:${delay}s;animation-duration:${duration}s`;
  });

  currentQuestionIndex = signal(0);
  scores = signal<Record<string, number>>({
    twink: 0,
    bear: 0,
    daddy: 0,
    otter: 0,
    femme: 0,
    masc: 0,
  });
  isFinished = signal(false);
  selectedAnswer = signal<number | null>(null);
  animating = signal(false);

  currentQuestion = computed(() => this.questions[this.currentQuestionIndex()]);
  progress = computed(() => (this.currentQuestionIndex() / this.questions.length) * 100);
  isLastQuestion = computed(
    () => this.currentQuestionIndex() + 1 >= this.questions.length
  );

  result = computed<Character | null>(() => {
    if (!this.isFinished()) return null;
    const s = this.scores();
    const topCharId = Object.entries(s).sort((a, b) => b[1] - a[1])[0][0];
    return this.characters.find((c) => c.id === topCharId) ?? null;
  });

  selectAnswer(index: number): void {
    if (this.animating()) return;
    this.selectedAnswer.set(index);
  }

  nextQuestion(): void {
    const idx = this.selectedAnswer();
    if (idx === null || this.animating()) return;

    this.animating.set(true);

    const answer = this.currentQuestion().answers[idx];
    const newScores = { ...this.scores() };
    for (const [charId, score] of Object.entries(answer.scores)) {
      newScores[charId] = (newScores[charId] ?? 0) + (score ?? 0);
    }
    this.scores.set(newScores);
    this.selectedAnswer.set(null);

    setTimeout(() => {
      if (this.currentQuestionIndex() + 1 >= this.questions.length) {
        this.isFinished.set(true);
      } else {
        this.currentQuestionIndex.update((i) => i + 1);
      }
      this.animating.set(false);
    }, 300);
  }

  restart(): void {
    this.currentQuestionIndex.set(0);
    this.scores.set({ twink: 0, bear: 0, daddy: 0, otter: 0, femme: 0, masc: 0 });
    this.isFinished.set(false);
    this.selectedAnswer.set(null);
    this.animating.set(false);
  }
}
