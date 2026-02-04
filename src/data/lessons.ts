/**
 * レッスンデータ定義
 * 日本語リスニング・発音練習用の音声素材
 */

export interface Lesson {
  id: string;
  title: string;
  level: 'N5' | 'N4';
  category: '挨拶（あいさつ）' | '日常（にちじょう）' | '買い物（かいもの）' | '食事（しょくじ）' | '交通（こうつう）';
  audioUrl: string;
  script: {
    japanese: string;         // ひらがな表記（ふりがな付き）
    japanesePlain: string;    // プレーンテキスト（音声認識比較用）
    japaneseKanji: string;    // 漢字表記
  };
  translations: {
    en: string;
    vi: string;
    zh: string;
    my: string;
    ne: string;
  };
  pronunciationTips: {
    ja: string[];
    en: string[];
    vi: string[];
    zh: string[];
    my: string[];
    ne: string[];
  };
  keywords: {
    word: string;
    reading: string;
    meaning: {
      en: string;
      vi: string;
      zh: string;
      my: string;
      ne: string;
    };
  }[];
  duration: number;           // 秒数
}

export const lessons: Lesson[] = [
  // ============================================
  // カテゴリー: 挨拶（3レッスン）
  // ============================================
  {
    id: 'lesson-001',
    title: '朝（あさ）の挨拶（あいさつ）',
    level: 'N5',
    category: '挨拶（あいさつ）',
    audioUrl: '/audio/lesson-001.mp3',
    script: {
      japanese: 'おはようございます。きょうも いいてんきですね。',
      japanesePlain: 'おはようございますきょうもいいてんきですね',
      japaneseKanji: 'おはようございます。今日もいい天気ですね。',
    },
    translations: {
      en: 'Good morning. The weather is nice today too, isn\'t it?',
      vi: 'Chào buổi sáng. Hôm nay thời tiết cũng đẹp nhỉ.',
      zh: '早上好。今天天气也很好呢。',
      my: 'မင်္ဂလာနံနက်ခင်းပါ။ ဒီနေ့လည်း ရာသီဥတုကောင်းတယ်နော်။',
      ne: 'शुभ प्रभात। आज पनि राम्रो मौसम छ, हैन?',
    },
    pronunciationTips: {
      ja: [
        '「おはようございます」→ 「おはよー」と伸ばさない',
        '「いいてんき」→ 「い」を2回はっきり言う',
        '「ですね」→ 語尾を少し上げる',
      ],
      en: [
        '"Ohayou gozaimasu" - Don\'t stretch "ohayo"',
        '"ii tenki" - Pronounce both "i" sounds clearly',
        '"desu ne" - Raise your tone slightly at the end',
      ],
      vi: [
        '"Ohayou gozaimasu" - Không kéo dài "ohayo"',
        '"ii tenki" - Phát âm rõ cả hai âm "i"',
        '"desu ne" - Nâng giọng nhẹ ở cuối câu',
      ],
      zh: [
        '「おはようございます」→ 不要把「おはよー」拖长',
        '「いいてんき」→ 两个「い」都要清晰发音',
        '「ですね」→ 句尾语调稍微上扬',
      ],
      my: [
        '"Ohayou gozaimasu" - "ohayo" ကို မဆွဲပါနဲ့',
        '"ii tenki" - "i" နှစ်ခုလုံးကို ရှင်းရှင်းလင်းလင်း အသံထွက်ပါ',
        '"desu ne" - စာကြောင်းအဆုံးမှာ အသံနည်းနည်း မြှင့်ပါ',
      ],
      ne: [
        '"Ohayou gozaimasu" - "ohayo" लाई लामो नतान्नुहोस्',
        '"ii tenki" - दुवै "i" स्पष्ट रूपमा उच्चारण गर्नुहोस्',
        '"desu ne" - अन्त्यमा स्वर थोरै उठाउनुहोस्',
      ],
    },
    keywords: [
      {
        word: 'おはようございます',
        reading: 'おはようございます',
        meaning: { en: 'Good morning (polite)', vi: 'Chào buổi sáng (lịch sự)', zh: '早上好（礼貌）', my: 'မင်္ဂလာနံနက်ခင်းပါ', ne: 'शुभ प्रभात' },
      },
      {
        word: '天気',
        reading: 'てんき',
        meaning: { en: 'weather', vi: 'thời tiết', zh: '天气', my: 'ရာသီဥတု', ne: 'मौसम' },
      },
    ],
    duration: 4,
  },
  {
    id: 'lesson-002',
    title: '自己紹介（じこしょうかい）',
    level: 'N5',
    category: '挨拶（あいさつ）',
    audioUrl: '/audio/lesson-002.mp3',
    script: {
      japanese: 'はじめまして。わたしは リンです。ベトナムから きました。どうぞ よろしく おねがいします。',
      japanesePlain: 'はじめましてわたしはりんですべとなむからきましたどうぞよろしくおねがいします',
      japaneseKanji: '初めまして。私はリンです。ベトナムから来ました。どうぞよろしくお願いします。',
    },
    translations: {
      en: 'Nice to meet you. I am Linh. I came from Vietnam. Please take care of me.',
      vi: 'Rất vui được gặp bạn. Tôi là Linh. Tôi đến từ Việt Nam. Rất mong được giúp đỡ.',
      zh: '初次见面。我是林。我来自越南。请多关照。',
      my: 'တွေ့ရတာ ဝမ်းသာပါတယ်။ ကျွန်မက လင် ပါ။ ဗီယက်နမ်က လာပါတယ်။ ကျေးဇူးပြု၍ ကူညီပေးပါ။',
      ne: 'भेटेर खुशी लाग्यो। म लिन हुँ। म भियतनामबाट आएको हुँ। कृपया मलाई सहयोग गर्नुहोस्।',
    },
    pronunciationTips: {
      ja: [
        '「はじめまして」→ 「は」をはっきり発音',
        '「ベトナム」→ 日本語の発音は「べとなむ」',
        '「よろしくおねがいします」→ ゆっくり丁寧に',
      ],
      en: [
        '"Hajimemashite" - Pronounce "ha" clearly',
        '"Betonamu" - Japanese pronunciation of Vietnam',
        '"Yoroshiku onegaishimasu" - Speak slowly and politely',
      ],
      vi: [
        '"Hajimemashite" - Phát âm "ha" rõ ràng',
        '"Betonamu" - Cách phát âm tiếng Nhật của Việt Nam',
        '"Yoroshiku onegaishimasu" - Nói chậm và lịch sự',
      ],
      zh: [
        '「はじめまして」→ 清晰发「は」音',
        '「ベトナム」→ 日语发音是「べとなむ」',
        '「よろしくおねがいします」→ 慢慢地、礼貌地说',
      ],
      my: [
        '"Hajimemashite" - "ha" ကို ရှင်းရှင်းလင်းလင်း အသံထွက်ပါ',
        '"Betonamu" - ဂျပန်ဘာသာစကားဖြင့် ဗီယက်နမ်',
        '"Yoroshiku onegaishimasu" - ဖြည်းဖြည်းနှင့် ယဉ်ကျေးစွာ ပြောပါ',
      ],
      ne: [
        '"Hajimemashite" - "ha" स्पष्ट रूपमा उच्चारण गर्नुहोस्',
        '"Betonamu" - भियतनामको जापानी उच्चारण',
        '"Yoroshiku onegaishimasu" - बिस्तारै र विनम्रतापूर्वक भन्नुहोस्',
      ],
    },
    keywords: [
      {
        word: '初めまして',
        reading: 'はじめまして',
        meaning: { en: 'Nice to meet you', vi: 'Rất vui được gặp bạn', zh: '初次见面', my: 'တွေ့ရတာ ဝမ်းသာပါတယ်', ne: 'भेटेर खुशी लाग्यो' },
      },
      {
        word: '来ました',
        reading: 'きました',
        meaning: { en: 'came from', vi: 'đến từ', zh: '来自', my: 'လာခဲ့သည်', ne: 'आएको' },
      },
    ],
    duration: 7,
  },
  {
    id: 'lesson-003',
    title: 'お礼（れい）を言（い）う',
    level: 'N5',
    category: '挨拶（あいさつ）',
    audioUrl: '/audio/lesson-003.mp3',
    script: {
      japanese: 'きのう、たすけてくれて ありがとうございました。ほんとうに たすかりました。',
      japanesePlain: 'きのうたすけてくれてありがとうございましたほんとうにたすかりました',
      japaneseKanji: '昨日、助けてくれてありがとうございました。本当に助かりました。',
    },
    translations: {
      en: 'Thank you for helping me yesterday. You really saved me.',
      vi: 'Cảm ơn bạn đã giúp đỡ tôi hôm qua. Bạn thực sự đã cứu tôi.',
      zh: '谢谢你昨天帮助我。真的帮了大忙。',
      my: 'မနေ့က ကူညီပေးတဲ့အတွက် ကျေးဇူးတင်ပါတယ်။ တကယ်ကို အကူအညီရခဲ့ပါတယ်။',
      ne: 'हिजो मलाई मद्दत गर्नुभएकोमा धन्यवाद। साँच्चै मद्दत भयो।',
    },
    pronunciationTips: {
      ja: [
        '「たすけてくれて」→ 「て」を軽く発音',
        '「ありがとうございました」→ 過去形に注意',
        '「たすかりました」→ 「す」が弱くなりすぎないように',
      ],
      en: [
        '"Tasukete kurete" - Pronounce "te" lightly',
        '"Arigatou gozaimashita" - Note the past tense',
        '"Tasukarimashita" - Don\'t make "su" too weak',
      ],
      vi: [
        '"Tasukete kurete" - Phát âm nhẹ "te"',
        '"Arigatou gozaimashita" - Chú ý thì quá khứ',
        '"Tasukarimashita" - Không làm yếu âm "su"',
      ],
      zh: [
        '「たすけてくれて」→ 轻轻发「て」音',
        '「ありがとうございました」→ 注意过去式',
        '「たすかりました」→ 「す」不要发得太弱',
      ],
      my: [
        '"Tasukete kurete" - "te" ကို ပေါ့ပေါ့ အသံထွက်ပါ',
        '"Arigatou gozaimashita" - အတိတ်ကာလကို သတိပြုပါ',
        '"Tasukarimashita" - "su" ကို အားမနည်းစေပါနဲ့',
      ],
      ne: [
        '"Tasukete kurete" - "te" हल्का उच्चारण गर्नुहोस्',
        '"Arigatou gozaimashita" - भूतकालमा ध्यान दिनुहोस्',
        '"Tasukarimashita" - "su" धेरै कमजोर नबनाउनुहोस्',
      ],
    },
    keywords: [
      {
        word: '助けて',
        reading: 'たすけて',
        meaning: { en: 'help', vi: 'giúp đỡ', zh: '帮助', my: 'ကူညီပါ', ne: 'मद्दत गर्नुहोस्' },
      },
      {
        word: '助かりました',
        reading: 'たすかりました',
        meaning: { en: 'was saved/helped', vi: 'được cứu giúp', zh: '得救了', my: 'အကူအညီရခဲ့သည်', ne: 'मद्दत भयो' },
      },
    ],
    duration: 6,
  },

  // ============================================
  // カテゴリー: 日常（3レッスン）
  // ============================================
  {
    id: 'lesson-004',
    title: '週末（しゅうまつ）の予定（よてい）',
    level: 'N5',
    category: '日常（にちじょう）',
    audioUrl: '/audio/lesson-004.mp3',
    script: {
      japanese: 'こんしゅうまつは ともだちと えいがを みに いきます。たのしみです。',
      japanesePlain: 'こんしゅうまつはともだちとえいがをみにいきますたのしみです',
      japaneseKanji: '今週末は友達と映画を見に行きます。楽しみです。',
    },
    translations: {
      en: 'This weekend, I will go see a movie with my friend. I\'m looking forward to it.',
      vi: 'Cuối tuần này, tôi sẽ đi xem phim với bạn. Tôi rất mong chờ.',
      zh: '这个周末我要和朋友去看电影。很期待。',
      my: 'ဒီအပတ်ကုန်မှာ သူငယ်ချင်းနဲ့ ရုပ်ရှင်ကြည့်သွားမယ်။ စောင့်မျှော်နေပါတယ်။',
      ne: 'यो हप्ताअन्तमा साथीसँग सिनेमा हेर्न जान्छु। म उत्सुक छु।',
    },
    pronunciationTips: {
      ja: [
        '「えいが」→ 「え」は口を横に広げる',
        '「みにいきます」→ 「に」と「い」をつなげすぎない',
        '「たのしみ」→ 「の」を強調しない',
      ],
      en: [
        '"Eiga" - Spread your mouth sideways for "e"',
        '"Mini ikimasu" - Don\'t connect "ni" and "i" too much',
        '"Tanoshimi" - Don\'t emphasize "no"',
      ],
      vi: [
        '"Eiga" - Mở rộng miệng khi phát âm "e"',
        '"Mini ikimasu" - Không nối "ni" và "i" quá nhiều',
        '"Tanoshimi" - Không nhấn mạnh "no"',
      ],
      zh: [
        '「えいが」→ 发「え」音时嘴巴横向张开',
        '「みにいきます」→ 「に」和「い」不要连得太紧',
        '「たのしみ」→ 不要强调「の」',
      ],
      my: [
        '"Eiga" - "e" အသံထွက်တဲ့အခါ ပါးစပ်ကို ဘေးဘက်ဖွင့်ပါ',
        '"Mini ikimasu" - "ni" နှင့် "i" ကို အရမ်းမဆက်ပါနဲ့',
        '"Tanoshimi" - "no" ကို အလေးမပေးပါနဲ့',
      ],
      ne: [
        '"Eiga" - "e" उच्चारण गर्दा मुख छेउतिर फैलाउनुहोस्',
        '"Mini ikimasu" - "ni" र "i" धेरै नजोड्नुहोस्',
        '"Tanoshimi" - "no" मा जोड नदिनुहोस्',
      ],
    },
    keywords: [
      {
        word: '週末',
        reading: 'しゅうまつ',
        meaning: { en: 'weekend', vi: 'cuối tuần', zh: '周末', my: 'အပတ်ကုန်', ne: 'हप्ताअन्त' },
      },
      {
        word: '映画',
        reading: 'えいが',
        meaning: { en: 'movie', vi: 'phim', zh: '电影', my: 'ရုပ်ရှင်', ne: 'सिनेमा' },
      },
      {
        word: '楽しみ',
        reading: 'たのしみ',
        meaning: { en: 'looking forward to', vi: 'mong chờ', zh: '期待', my: 'စောင့်မျှော်ခြင်း', ne: 'उत्सुकता' },
      },
    ],
    duration: 6,
  },
  {
    id: 'lesson-005',
    title: '昨日（きのう）の出来事（できごと）',
    level: 'N5',
    category: '日常（にちじょう）',
    audioUrl: '/audio/lesson-005.mp3',
    script: {
      japanese: 'きのう、ともだちと えいがを みました。とても おもしろかったです。',
      japanesePlain: 'きのうともだちとえいがをみましたとてもおもしろかったです',
      japaneseKanji: '昨日、友達と映画を見ました。とても面白かったです。',
    },
    translations: {
      en: 'Yesterday, I watched a movie with my friend. It was very interesting.',
      vi: 'Hôm qua, tôi đã xem phim với bạn. Rất thú vị.',
      zh: '昨天我和朋友看了电影。非常有趣。',
      my: 'မနေ့က သူငယ်ချင်းနဲ့ ရုပ်ရှင်ကြည့်ခဲ့တယ်။ အရမ်းစိတ်ဝင်စားစရာကောင်းတယ်။',
      ne: 'हिजो साथीसँग सिनेमा हेरेँ। धेरै रमाइलो थियो।',
    },
    pronunciationTips: {
      ja: [
        '「きのう」→ 「き」を強く言わない',
        '「ともだち」→ はっきりと4拍で',
        '「おもしろかった」→ 「しろ」を強調しない',
      ],
      en: [
        '"Kinou" - Don\'t stress "ki" too much',
        '"Tomodachi" - Pronounce clearly in 4 beats',
        '"Omoshirokatta" - Don\'t emphasize "shiro"',
      ],
      vi: [
        '"Kinou" - Không nhấn mạnh "ki" quá',
        '"Tomodachi" - Phát âm rõ ràng 4 nhịp',
        '"Omoshirokatta" - Không nhấn "shiro"',
      ],
      zh: [
        '「きのう」→ 不要把「き」说得太重',
        '「ともだち」→ 清晰地发4拍',
        '「おもしろかった」→ 不要强调「しろ」',
      ],
      my: [
        '"Kinou" - "ki" ကို အရမ်းအားမပေးပါနဲ့',
        '"Tomodachi" - ၄ ချက် ရှင်းရှင်းလင်းလင်း အသံထွက်ပါ',
        '"Omoshirokatta" - "shiro" ကို အလေးမပေးပါနဲ့',
      ],
      ne: [
        '"Kinou" - "ki" मा धेरै जोड नदिनुहोस्',
        '"Tomodachi" - ४ बीटमा स्पष्ट उच्चारण गर्नुहोस्',
        '"Omoshirokatta" - "shiro" मा जोड नदिनुहोस्',
      ],
    },
    keywords: [
      {
        word: '昨日',
        reading: 'きのう',
        meaning: { en: 'yesterday', vi: 'hôm qua', zh: '昨天', my: 'မနေ့က', ne: 'हिजो' },
      },
      {
        word: '友達',
        reading: 'ともだち',
        meaning: { en: 'friend', vi: 'bạn bè', zh: '朋友', my: 'သူငယ်ချင်း', ne: 'साथी' },
      },
      {
        word: '面白かった',
        reading: 'おもしろかった',
        meaning: { en: 'was interesting', vi: 'thú vị', zh: '有趣', my: 'စိတ်ဝင်စားစရာကောင်းခဲ့သည်', ne: 'रमाइलो थियो' },
      },
    ],
    duration: 5,
  },
  {
    id: 'lesson-006',
    title: '趣味（しゅみ）について',
    level: 'N5',
    category: '日常（にちじょう）',
    audioUrl: '/audio/lesson-006.mp3',
    script: {
      japanese: 'わたしの しゅみは おんがくを きくことです。にほんの うたが すきです。',
      japanesePlain: 'わたしのしゅみはおんがくをきくことですにほんのうたがすきです',
      japaneseKanji: '私の趣味は音楽を聴くことです。日本の歌が好きです。',
    },
    translations: {
      en: 'My hobby is listening to music. I like Japanese songs.',
      vi: 'Sở thích của tôi là nghe nhạc. Tôi thích nhạc Nhật.',
      zh: '我的爱好是听音乐。我喜欢日本歌曲。',
      my: 'ကျွန်တော့်ဝါသနာက ဂီတနားထောင်တာပါ။ ဂျပန်သီချင်းတွေကို ကြိုက်တယ်။',
      ne: 'मेरो शौक संगीत सुन्नु हो। मलाई जापानी गीत मन पर्छ।',
    },
    pronunciationTips: {
      ja: [
        '「しゅみ」→ 「しゅ」は唇を丸めて',
        '「おんがく」→ 「ん」をしっかり発音',
        '「すき」→ 「す」は軽く',
      ],
      en: [
        '"Shumi" - Round your lips for "shu"',
        '"Ongaku" - Pronounce "n" clearly',
        '"Suki" - Pronounce "su" lightly',
      ],
      vi: [
        '"Shumi" - Làm tròn môi khi phát âm "shu"',
        '"Ongaku" - Phát âm rõ "n"',
        '"Suki" - Phát âm nhẹ "su"',
      ],
      zh: [
        '「しゅみ」→ 发「しゅ」时嘴唇要圆',
        '「おんがく」→ 「ん」要发清楚',
        '「すき」→ 「す」要轻',
      ],
      my: [
        '"Shumi" - "shu" အသံထွက်တဲ့အခါ နှုတ်ခမ်းကို ဝိုင်းပါ',
        '"Ongaku" - "n" ကို ရှင်းရှင်းလင်းလင်း အသံထွက်ပါ',
        '"Suki" - "su" ကို ပေါ့ပေါ့ အသံထွက်ပါ',
      ],
      ne: [
        '"Shumi" - "shu" को लागि ओठ गोलो बनाउनुहोस्',
        '"Ongaku" - "n" स्पष्ट उच्चारण गर्नुहोस्',
        '"Suki" - "su" हल्का उच्चारण गर्नुहोस्',
      ],
    },
    keywords: [
      {
        word: '趣味',
        reading: 'しゅみ',
        meaning: { en: 'hobby', vi: 'sở thích', zh: '爱好', my: 'ဝါသနာ', ne: 'शौक' },
      },
      {
        word: '音楽',
        reading: 'おんがく',
        meaning: { en: 'music', vi: 'âm nhạc', zh: '音乐', my: 'ဂီတ', ne: 'संगीत' },
      },
      {
        word: '歌',
        reading: 'うた',
        meaning: { en: 'song', vi: 'bài hát', zh: '歌曲', my: 'သီချင်း', ne: 'गीत' },
      },
    ],
    duration: 6,
  },

  // ============================================
  // カテゴリー: 買い物（2レッスン）
  // ============================================
  {
    id: 'lesson-007',
    title: 'コンビニで',
    level: 'N5',
    category: '買い物（かいもの）',
    audioUrl: '/audio/lesson-007.mp3',
    script: {
      japanese: 'すみません、この おにぎりを ください。あと、おちゃも おねがいします。',
      japanesePlain: 'すみませんこのおにぎりをくださいあとおちゃもおねがいします',
      japaneseKanji: 'すみません、このおにぎりをください。あと、お茶もお願いします。',
    },
    translations: {
      en: 'Excuse me, please give me this onigiri. Also, tea please.',
      vi: 'Xin lỗi, cho tôi cái onigiri này. Và cả trà nữa.',
      zh: '不好意思，请给我这个饭团。还有，请给我茶。',
      my: 'ခွင့်လွှတ်ပါ၊ ဒီအိုနိဂီရိကို ပေးပါ။ နောက်ပြီး လက်ဖက်ရည်လည်း ပေးပါ။',
      ne: 'माफ गर्नुहोस्, यो ओनिगिरी दिनुहोस्। अनि चिया पनि दिनुहोस्।',
    },
    pronunciationTips: {
      ja: [
        '「すみません」→ 丁寧に、ゆっくり',
        '「おにぎり」→ 4拍で均等に',
        '「おねがいします」→ 「お」をしっかり',
      ],
      en: [
        '"Sumimasen" - Speak politely and slowly',
        '"Onigiri" - Pronounce evenly in 4 beats',
        '"Onegaishimasu" - Pronounce "o" clearly',
      ],
      vi: [
        '"Sumimasen" - Lịch sự và chậm',
        '"Onigiri" - Đều 4 nhịp',
        '"Onegaishimasu" - Nhấn "o"',
      ],
      zh: [
        '「すみません」→ 礼貌地、慢慢地说',
        '「おにぎり」→ 均匀的4拍',
        '「おねがいします」→ 「お」要发清楚',
      ],
      my: [
        '"Sumimasen" - ယဉ်ကျေးစွာနှင့် ဖြည်းဖြည်း ပြောပါ',
        '"Onigiri" - ၄ ချက် ညီညီမျှမျှ အသံထွက်ပါ',
        '"Onegaishimasu" - "o" ကို ရှင်းရှင်းလင်းလင်း အသံထွက်ပါ',
      ],
      ne: [
        '"Sumimasen" - विनम्रतापूर्वक र बिस्तारै भन्नुहोस्',
        '"Onigiri" - ४ बीटमा समान रूपमा',
        '"Onegaishimasu" - "o" स्पष्ट उच्चारण गर्नुहोस्',
      ],
    },
    keywords: [
      {
        word: 'おにぎり',
        reading: 'おにぎり',
        meaning: { en: 'rice ball', vi: 'cơm nắm', zh: '饭团', my: 'ထမင်းလုံး', ne: 'चामलको बल' },
      },
      {
        word: 'お茶',
        reading: 'おちゃ',
        meaning: { en: 'tea', vi: 'trà', zh: '茶', my: 'လက်ဖက်ရည်', ne: 'चिया' },
      },
    ],
    duration: 5,
  },
  {
    id: 'lesson-008',
    title: '値段（ねだん）を聞（き）く',
    level: 'N5',
    category: '買い物（かいもの）',
    audioUrl: '/audio/lesson-008.mp3',
    script: {
      japanese: 'すみません、これは いくらですか。',
      japanesePlain: 'すみませんこれはいくらですか',
      japaneseKanji: 'すみません、これはいくらですか。',
    },
    translations: {
      en: 'Excuse me, how much is this?',
      vi: 'Xin lỗi, cái này bao nhiêu tiền?',
      zh: '不好意思，这个多少钱？',
      my: 'ခွင့်လွှတ်ပါ၊ ဒါ ဘယ်လောက်လဲ?',
      ne: 'माफ गर्नुहोस्, यो कति हो?',
    },
    pronunciationTips: {
      ja: [
        '「いくら」→ 「い」をはっきり',
        '「ですか」→ 語尾を上げて質問調に',
      ],
      en: [
        '"Ikura" - Pronounce "i" clearly',
        '"Desu ka" - Raise your tone at the end for a question',
      ],
      vi: [
        '"Ikura" - Phát âm "i" rõ ràng',
        '"Desu ka" - Nâng giọng cuối câu để thành câu hỏi',
      ],
      zh: [
        '「いくら」→ 「い」要发清楚',
        '「ですか」→ 句尾上扬表示疑问',
      ],
      my: [
        '"Ikura" - "i" ကို ရှင်းရှင်းလင်းလင်း အသံထွက်ပါ',
        '"Desu ka" - မေးခွန်းအဖြစ် စာကြောင်းအဆုံးမှာ အသံမြှင့်ပါ',
      ],
      ne: [
        '"Ikura" - "i" स्पष्ट उच्चारण गर्नुहोस्',
        '"Desu ka" - प्रश्नको लागि अन्त्यमा स्वर उठाउनुहोस्',
      ],
    },
    keywords: [
      {
        word: 'いくら',
        reading: 'いくら',
        meaning: { en: 'how much', vi: 'bao nhiêu', zh: '多少钱', my: 'ဘယ်လောက်', ne: 'कति' },
      },
    ],
    duration: 3,
  },

  // ============================================
  // カテゴリー: 食事（2レッスン）
  // ============================================
  {
    id: 'lesson-009',
    title: 'レストランで注文（ちゅうもん）',
    level: 'N5',
    category: '食事（しょくじ）',
    audioUrl: '/audio/lesson-009.mp3',
    script: {
      japanese: 'すみません、ラーメンを ひとつと、ぎょうざを おねがいします。',
      japanesePlain: 'すみませんらーめんをひとつとぎょうざをおねがいします',
      japaneseKanji: 'すみません、ラーメンを一つと、餃子をお願いします。',
    },
    translations: {
      en: 'Excuse me, one ramen and gyoza please.',
      vi: 'Xin lỗi, cho tôi một tô mì ramen và há cảo.',
      zh: '不好意思，请给我一份拉面和饺子。',
      my: 'ခွင့်လွှတ်ပါ၊ ရာမင်တစ်ခွက်နဲ့ ဂျိုဇာ ပေးပါ။',
      ne: 'माफ गर्नुहोस्, एउटा रामेन र ग्योजा दिनुहोस्।',
    },
    pronunciationTips: {
      ja: [
        '「ラーメン」→ 「ラー」を伸ばす',
        '「ひとつ」→ 「つ」をしっかり',
        '「ぎょうざ」→ 「ぎょ」は口を丸く',
      ],
      en: [
        '"Raamen" - Stretch "raa"',
        '"Hitotsu" - Pronounce "tsu" clearly',
        '"Gyouza" - Round your mouth for "gyo"',
      ],
      vi: [
        '"Raamen" - Kéo dài "raa"',
        '"Hitotsu" - Phát âm rõ "tsu"',
        '"Gyouza" - Làm tròn miệng khi phát âm "gyo"',
      ],
      zh: [
        '「ラーメン」→ 「ラー」要拖长',
        '「ひとつ」→ 「つ」要发清楚',
        '「ぎょうざ」→ 发「ぎょ」时嘴唇要圆',
      ],
      my: [
        '"Raamen" - "raa" ကို ဆွဲပါ',
        '"Hitotsu" - "tsu" ကို ရှင်းရှင်းလင်းလင်း အသံထွက်ပါ',
        '"Gyouza" - "gyo" အသံထွက်တဲ့အခါ ပါးစပ်ကို ဝိုင်းပါ',
      ],
      ne: [
        '"Raamen" - "raa" लामो बनाउनुहोस्',
        '"Hitotsu" - "tsu" स्पष्ट उच्चारण गर्नुहोस्',
        '"Gyouza" - "gyo" को लागि मुख गोलो बनाउनुहोस्',
      ],
    },
    keywords: [
      {
        word: 'ラーメン',
        reading: 'らーめん',
        meaning: { en: 'ramen', vi: 'mì ramen', zh: '拉面', my: 'ရာမင်', ne: 'रामेन' },
      },
      {
        word: '一つ',
        reading: 'ひとつ',
        meaning: { en: 'one (thing)', vi: 'một cái', zh: '一个', my: 'တစ်ခု', ne: 'एउटा' },
      },
      {
        word: '餃子',
        reading: 'ぎょうざ',
        meaning: { en: 'gyoza (dumplings)', vi: 'há cảo', zh: '饺子', my: 'ဂျိုဇာ', ne: 'ग्योजा' },
      },
    ],
    duration: 5,
  },
  {
    id: 'lesson-010',
    title: '食事（しょくじ）の感想（かんそう）',
    level: 'N5',
    category: '食事（しょくじ）',
    audioUrl: '/audio/lesson-010.mp3',
    script: {
      japanese: 'このラーメン、とても おいしいですね。スープが さいこうです。',
      japanesePlain: 'このらーめんとてもおいしいですねすーぷがさいこうです',
      japaneseKanji: 'このラーメン、とても美味しいですね。スープが最高です。',
    },
    translations: {
      en: 'This ramen is very delicious, isn\'t it? The soup is the best.',
      vi: 'Tô mì ramen này rất ngon nhỉ. Nước súp tuyệt vời.',
      zh: '这个拉面非常好吃呢。汤是最棒的。',
      my: 'ဒီရာမင် အရမ်းကောင်းတယ်နော်။ ဟင်းချိုက အကောင်းဆုံးပဲ။',
      ne: 'यो रामेन धेरै मिठो छ। सूप सबैभन्दा राम्रो छ।',
    },
    pronunciationTips: {
      ja: [
        '「おいしい」→ 「い」を2回はっきり',
        '「スープ」→ 「ー」を伸ばす',
        '「さいこう」→ 「こう」を伸ばす',
      ],
      en: [
        '"Oishii" - Pronounce both "i" sounds clearly',
        '"Suupu" - Stretch "uu"',
        '"Saikou" - Stretch "kou"',
      ],
      vi: [
        '"Oishii" - Phát âm rõ cả hai âm "i"',
        '"Suupu" - Kéo dài "uu"',
        '"Saikou" - Kéo dài "kou"',
      ],
      zh: [
        '「おいしい」→ 两个「い」都要发清楚',
        '「スープ」→ 「ー」要拖长',
        '「さいこう」→ 「こう」要拖长',
      ],
      my: [
        '"Oishii" - "i" နှစ်ခုလုံးကို ရှင်းရှင်းလင်းလင်း အသံထွက်ပါ',
        '"Suupu" - "uu" ကို ဆွဲပါ',
        '"Saikou" - "kou" ကို ဆွဲပါ',
      ],
      ne: [
        '"Oishii" - दुवै "i" स्पष्ट उच्चारण गर्नुहोस्',
        '"Suupu" - "uu" लामो बनाउनुहोस्',
        '"Saikou" - "kou" लामो बनाउनुहोस्',
      ],
    },
    keywords: [
      {
        word: '美味しい',
        reading: 'おいしい',
        meaning: { en: 'delicious', vi: 'ngon', zh: '好吃', my: 'အရသာရှိသည်', ne: 'मिठो' },
      },
      {
        word: 'スープ',
        reading: 'すーぷ',
        meaning: { en: 'soup', vi: 'súp', zh: '汤', my: 'ဟင်းချို', ne: 'सूप' },
      },
      {
        word: '最高',
        reading: 'さいこう',
        meaning: { en: 'the best', vi: 'tuyệt vời', zh: '最棒', my: 'အကောင်းဆုံး', ne: 'सबैभन्दा राम्रो' },
      },
    ],
    duration: 5,
  },
];

/**
 * カテゴリー別にレッスンを取得
 */
export const getLessonsByCategory = (category: Lesson['category']): Lesson[] => {
  return lessons.filter((lesson) => lesson.category === category);
};

/**
 * レベル別にレッスンを取得
 */
export const getLessonsByLevel = (level: Lesson['level']): Lesson[] => {
  return lessons.filter((lesson) => lesson.level === level);
};

/**
 * IDでレッスンを取得
 */
export const getLessonById = (id: string): Lesson | undefined => {
  return lessons.find((lesson) => lesson.id === id);
};

/**
 * カテゴリー一覧を取得
 */
export const getCategories = (): Lesson['category'][] => {
  return Array.from(new Set(lessons.map((lesson) => lesson.category)));
};
