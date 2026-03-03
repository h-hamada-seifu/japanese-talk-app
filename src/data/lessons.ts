/**
 * レッスンデータ定義
 * 日本語リスニング・発音練習用の音声素材
 */

export interface Lesson {
  id: string;
  title: string;
  level: 'N5' | 'N4' | 'N3' | 'N2';
  category?: string;
  audioUrl: string;
  script: {
    japanese: string;              // ひらがな表記（ふりがな付き）
    japanesePlain: string;         // プレーンテキスト（音声認識比較用）
    japaneseKanji: string;         // 漢字表記
    japaneseWithRuby?: string;     // rubyタグ付きHTML文字列（N3用）
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
    audioUrl: '/audio/N5/lesson-001.wav',
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
    audioUrl: '/audio/N5/lesson-002.wav',
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
    audioUrl: '/audio/N5/lesson-003.wav',
    script: {
      japanese: 'きのう、たすけてくれて ありがとうございました。ほんとうに たすかりました。',
      japanesePlain: 'きのうたすけてくれてありがとうございましたほんとうにたすかりました',
      japaneseKanji: '昨日、助けてくれてありがとうございました。本当に助かりました。',
    },
    translations: {
      en: 'Thank you for helping me yesterday. You really saved me.',
      vi: 'Cảm ơn bạn đã giúp đỡ tôi hôm qua. Thật sự đã giúp tôi rất nhiều.',
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
        meaning: { en: 'was saved/helped', vi: 'được giúp đỡ', zh: '得到了帮助', my: 'အကူအညီရခဲ့သည်', ne: 'मद्दत भयो' },
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
    audioUrl: '/audio/N5/lesson-004.wav',
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
    audioUrl: '/audio/N5/lesson-005.wav',
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
    audioUrl: '/audio/N5/lesson-006.wav',
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
    audioUrl: '/audio/N5/lesson-007.wav',
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
    audioUrl: '/audio/N5/lesson-008.wav',
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
    audioUrl: '/audio/N5/lesson-009.wav',
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
    audioUrl: '/audio/N5/lesson-010.wav',
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

  // ============================================
  // N4レベル（5レッスン）
  // やや長い文・て形・理由表現など
  // ============================================
  {
    id: 'lesson-011',
    title: '電話（でんわ）で約束（やくそく）',
    level: 'N4',
    category: '日常（にちじょう）',
    audioUrl: '/audio/N4/lesson-011.wav',
    script: {
      japanese: 'もしもし、あしたの ごご さんじに えきまえで あいませんか。いっしょに かいものに いきたいんですが。じかんが あったら、れんらく ください。',
      japanesePlain: 'もしもしあしたのごごさんじにえきまえであいませんかいっしょにかいものにいきたいんですがじかんがあったられんらくください',
      japaneseKanji: 'もしもし、明日の午後3時に駅前で会いませんか。一緒に買い物に行きたいんですが。時間があったら、連絡ください。',
    },
    translations: {
      en: 'Hello? Shall we meet at 3 PM tomorrow in front of the station? I\'d like to go shopping together. Please contact me if you have time.',
      vi: 'Xin chào? Ngày mai lúc 3 giờ chiều gặp nhau ở trước ga được không? Tôi muốn đi mua sắm cùng. Nếu có thời gian, hãy liên lạc nhé.',
      zh: '喂？明天下午3点在车站前见面好吗？想一起去购物。有时间的话请联系我。',
      my: 'ဟဲလို? မနက်ဖြန် ညနေ ၃ နာရီမှာ ဘူတာရှေ့မှာ တွေ့ကြရအောင်လား။ အတူတူ ဈေးဝယ်သွားချင်ပါတယ်။ အချိန်ရရင် ဆက်သွယ်ပေးပါ။',
      ne: 'हेलो? भोलि दिउँसो ३ बजे स्टेशन अगाडि भेटौँ न। सँगै किनमेल गर्न जान चाहन्छु। समय भए सम्पर्क गर्नुहोस्।',
    },
    pronunciationTips: {
      ja: [
        '「あいませんか」→ 語尾を上げて誘いの気持ちを出す',
        '「いきたいんですが」→ 「んです」で理由を伝える',
        '「れんらく」→ 「ん」をしっかり2回発音',
      ],
      en: [
        '"aimasen ka" - Raise the intonation at the end to express an invitation',
        '"ikitain desu ga" - "n desu" conveys the reason',
        '"renraku" - Pronounce both "n" sounds clearly',
      ],
      vi: [
        '"aimasen ka" - Nâng giọng ở cuối câu để thể hiện lời mời',
        '"ikitain desu ga" - "n desu" diễn đạt lý do',
        '"renraku" - Phát âm rõ cả hai âm "n"',
      ],
      zh: [
        '「あいませんか」→ 句尾语调上扬，表达邀请',
        '「いきたいんですが」→ 「んです」表达理由',
        '「れんらく」→ 两个「ん」都要清晰发音',
      ],
      my: [
        '"aimasen ka" - ဖိတ်ခေါ်မှုကို ဖော်ပြရန် အဆုံးတွင် အသံမြှင့်ပါ',
        '"ikitain desu ga" - "n desu" သည် အကြောင်းပြချက်ကို ဖော်ပြသည်',
        '"renraku" - "n" နှစ်ခုလုံးကို ရှင်းရှင်းလင်းလင်း အသံထွက်ပါ',
      ],
      ne: [
        '"aimasen ka" - निमन्त्रणा व्यक्त गर्न अन्त्यमा स्वर उठाउनुहोस्',
        '"ikitain desu ga" - "n desu" ले कारण व्यक्त गर्छ',
        '"renraku" - दुवै "n" स्पष्ट रूपमा उच्चारण गर्नुहोस्',
      ],
    },
    keywords: [
      {
        word: '駅前',
        reading: 'えきまえ',
        meaning: { en: 'in front of the station', vi: 'trước ga', zh: '车站前', my: 'ဘူတာရှေ့', ne: 'स्टेशन अगाडि' },
      },
      {
        word: '連絡',
        reading: 'れんらく',
        meaning: { en: 'contact', vi: 'liên lạc', zh: '联系', my: 'ဆက်သွယ်ရေး', ne: 'सम्पर्क' },
      },
    ],
    duration: 8,
  },
  {
    id: 'lesson-012',
    title: '道（みち）を聞（き）く',
    level: 'N4',
    category: '交通（こうつう）',
    audioUrl: '/audio/N4/lesson-012.wav',
    script: {
      japanese: 'すみません、ゆうびんきょくは どこですか。まっすぐ いって、ふたつめの しんごうを みぎに まがると、ひだりがわに あります。',
      japanesePlain: 'すみませんゆうびんきょくはどこですかまっすぐいってふたつめのしんごうをみぎにまがるとひだりがわにあります',
      japaneseKanji: 'すみません、郵便局はどこですか。まっすぐ行って、2つ目の信号を右に曲がると、左側にあります。',
    },
    translations: {
      en: 'Excuse me, where is the post office? Go straight ahead, turn right at the second traffic light, and it will be on the left side.',
      vi: 'Xin lỗi, bưu điện ở đâu ạ? Đi thẳng, rẽ phải ở đèn giao thông thứ hai thì sẽ thấy ở bên trái.',
      zh: '请问，邮局在哪里？一直走，在第二个红绿灯右转，就在左边。',
      my: 'ခွင့်ပြုပါ၊ စာတိုက်က ဘယ်မှာလဲ။ တည့်တည့်သွားပြီး ဒုတိယ မီးပွိုင့်မှာ ညာဘက်ကွေ့ရင် ဘယ်ဘက်ခြမ်းမှာ ရှိပါတယ်။',
      ne: 'माफ गर्नुहोस्, हुलाक कार्यालय कहाँ छ? सिधा जानुहोस्, दोस्रो बत्तीमा दायाँ मोड्नुहोस्, बायाँ तिर हुन्छ।',
    },
    pronunciationTips: {
      ja: [
        '「ゆうびんきょく」→ 「きょ」は口を丸めて',
        '「まっすぐ」→ 「っ」の前で一瞬止まる',
        '「ひだりがわ」→ 5拍で均等に',
      ],
      en: [
        '"yuubinkyoku" - Round your lips for "kyo"',
        '"massugu" - Pause briefly before the double consonant "ss"',
        '"hidarigawa" - Pronounce evenly in 5 beats',
      ],
      vi: [
        '"yuubinkyoku" - Làm tròn môi khi phát âm "kyo"',
        '"massugu" - Dừng một chút trước phụ âm kép "ss"',
        '"hidarigawa" - Phát âm đều đặn thành 5 nhịp',
      ],
      zh: [
        '「ゆうびんきょく」→ 发「きょ」时嘴唇要圆',
        '「まっすぐ」→ 促音「っ」前要短暂停顿',
        '「ひだりがわ」→ 5拍均匀发音',
      ],
      my: [
        '"yuubinkyoku" - "kyo" အတွက် နှုတ်ခမ်းကို ဝိုင်းအောင်လုပ်ပါ',
        '"massugu" - "ss" နှစ်ထပ်ဗျည်းရှေ့တွင် ခဏရပ်ပါ',
        '"hidarigawa" - ၅ ချက်ညီညီ အသံထွက်ပါ',
      ],
      ne: [
        '"yuubinkyoku" - "kyo" को लागि ओठ गोलो बनाउनुहोस्',
        '"massugu" - दोहोरो व्यञ्जन "ss" अघि छोटो विराम लिनुहोस्',
        '"hidarigawa" - ५ तालमा समान रूपमा उच्चारण गर्नुहोस्',
      ],
    },
    keywords: [
      {
        word: '郵便局',
        reading: 'ゆうびんきょく',
        meaning: { en: 'post office', vi: 'bưu điện', zh: '邮局', my: 'စာတိုက်', ne: 'हुलाक कार्यालय' },
      },
      {
        word: '信号',
        reading: 'しんごう',
        meaning: { en: 'traffic light', vi: 'đèn giao thông', zh: '红绿灯', my: 'မီးပွိုင့်', ne: 'बत्ती' },
      },
      {
        word: '曲がる',
        reading: 'まがる',
        meaning: { en: 'to turn', vi: 'rẽ', zh: '转弯', my: 'ကွေ့သည်', ne: 'मोड्नु' },
      },
    ],
    duration: 9,
  },
  {
    id: 'lesson-013',
    title: '病院（びょういん）で',
    level: 'N4',
    category: '日常（にちじょう）',
    audioUrl: '/audio/N4/lesson-013.wav',
    script: {
      japanese: 'きのうから あたまが いたくて、ねつも あります。くすりを のみましたが、まだ よくなりません。せんせい、どうしたら いいですか。',
      japanesePlain: 'きのうからあたまがいたくてねつもありますくすりをのみましたがまだよくなりませんせんせいどうしたらいいですか',
      japaneseKanji: '昨日から頭が痛くて、熱もあります。薬を飲みましたが、まだよくなりません。先生、どうしたらいいですか。',
    },
    translations: {
      en: 'I\'ve had a headache since yesterday, and I also have a fever. I took medicine, but I haven\'t gotten better yet. Doctor, what should I do?',
      vi: 'Từ hôm qua tôi bị đau đầu, và cũng bị sốt. Tôi đã uống thuốc nhưng vẫn chưa khỏi. Bác sĩ, tôi nên làm gì ạ?',
      zh: '从昨天开始头疼，还发烧。吃了药但还没好。医生，该怎么办呢？',
      my: 'မနေ့ကတည်းက ခေါင်းကိုက်ပြီး ဖျားနေပါတယ်။ ဆေးသောက်ပေမယ့် မသက်သာသေးပါ။ ဆရာဝန်၊ ဘာလုပ်ရမလဲ။',
      ne: 'हिजोदेखि टाउको दुखेको छ, ज्वरो पनि छ। औषधि खाएँ तर अझै राम्रो भएन। डाक्टर, के गर्नुपर्छ?',
    },
    pronunciationTips: {
      ja: [
        '「いたくて」→ て形で理由をつなげる表現',
        '「よくなりません」→ 否定の「ません」をはっきり',
        '「どうしたら」→ 「した」にアクセントを置く',
      ],
      en: [
        '"itakute" - Te-form connects the reason',
        '"yoku narimasen" - Pronounce the negative "masen" clearly',
        '"doushitara" - Put the accent on "shita"',
      ],
      vi: [
        '"itakute" - Dạng te nối lý do',
        '"yoku narimasen" - Phát âm rõ phủ định "masen"',
        '"doushitara" - Đặt trọng âm vào "shita"',
      ],
      zh: [
        '「いたくて」→ て形连接原因',
        '「よくなりません」→ 否定「ません」要发音清晰',
        '「どうしたら」→ 重音放在「した」上',
      ],
      my: [
        '"itakute" - て ပုံစံဖြင့် အကြောင်းပြချက်ကို ချိတ်ဆက်သည်',
        '"yoku narimasen" - အငြင်းပုံစံ "masen" ကို ရှင်းရှင်းလင်းလင်း အသံထွက်ပါ',
        '"doushitara" - "shita" တွင် အသံလေယူပါ',
      ],
      ne: [
        '"itakute" - て रूपले कारण जोड्छ',
        '"yoku narimasen" - नकारात्मक "masen" स्पष्ट उच्चारण गर्नुहोस्',
        '"doushitara" - "shita" मा बल दिनुहोस्',
      ],
    },
    keywords: [
      {
        word: '熱',
        reading: 'ねつ',
        meaning: { en: 'fever', vi: 'sốt', zh: '发烧', my: 'ဖျားခြင်း', ne: 'ज्वरो' },
      },
      {
        word: '薬',
        reading: 'くすり',
        meaning: { en: 'medicine', vi: 'thuốc', zh: '药', my: 'ဆေး', ne: 'औषधि' },
      },
    ],
    duration: 10,
  },
  {
    id: 'lesson-014',
    title: 'アルバイトの面接（めんせつ）',
    level: 'N4',
    category: '仕事（しごと）',
    audioUrl: '/audio/N4/lesson-014.wav',
    script: {
      japanese: 'がっこうが おわってから、まいにち ごごろくじまで はたらくことが できます。にほんごは まだ じょうずでは ありませんが、がんばります。どうぞ よろしく おねがいします。',
      japanesePlain: 'がっこうがおわってからまいにちごごろくじまではたらくことができますにほんごはまだじょうずではありませんががんばりますどうぞよろしくおねがいします',
      japaneseKanji: '学校が終わってから、毎日午後6時まで働くことができます。日本語はまだ上手ではありませんが、頑張ります。どうぞよろしくお願いします。',
    },
    translations: {
      en: 'After school finishes, I can work every day until 6 PM. My Japanese is not very good yet, but I will do my best. Thank you for your consideration.',
      vi: 'Sau khi tan học, tôi có thể làm việc mỗi ngày đến 6 giờ chiều. Tiếng Nhật của tôi chưa giỏi lắm, nhưng tôi sẽ cố gắng. Xin hãy giúp đỡ.',
      zh: '放学后每天可以工作到下午6点。日语还不太好，但我会努力的。请多关照。',
      my: 'ကျောင်းပြီးရင် နေ့တိုင်း ညနေ ၆ နာရီအထိ အလုပ်လုပ်နိုင်ပါတယ်။ ဂျပန်စာ မကောင်းသေးပေမယ့် ကြိုးစားပါမယ်။ ကျေးဇူးပြု၍ ကူညီပါ။',
      ne: 'विद्यालय सकिएपछि हरेक दिन साँझ ६ बजेसम्म काम गर्न सक्छु। जापानी भाषा अझै राम्रो छैन, तर म पूरा प्रयास गर्छु। कृपया सहयोग गर्नुहोस्।',
    },
    pronunciationTips: {
      ja: [
        '「おわってから」→ 「って」で強く、「から」で理由を示す',
        '「じょうず」→ 「じょ」は口を丸めて',
        '「がんばります」→ 最後まではっきり言い切る',
      ],
      en: [
        '"owatte kara" - Emphasize "tte", "kara" shows the reason',
        '"jouzu" - Round your lips for "jo"',
        '"ganbarimasu" - Say it clearly to the end',
      ],
      vi: [
        '"owatte kara" - Nhấn mạnh "tte", "kara" chỉ lý do',
        '"jouzu" - Làm tròn môi khi phát âm "jo"',
        '"ganbarimasu" - Nói rõ ràng đến cuối',
      ],
      zh: [
        '「おわってから」→ 「って」要重读，「から」表示理由',
        '「じょうず」→ 发「じょ」时嘴唇要圆',
        '「がんばります」→ 一直说到最后，发音要清晰',
      ],
      my: [
        '"owatte kara" - "tte" ကို အားပြုပါ၊ "kara" သည် အကြောင်းပြချက်ဖော်ပြသည်',
        '"jouzu" - "jo" အတွက် နှုတ်ခမ်းကို ဝိုင်းအောင်လုပ်ပါ',
        '"ganbarimasu" - အဆုံးအထိ ရှင်းရှင်းလင်းလင်း ပြောပါ',
      ],
      ne: [
        '"owatte kara" - "tte" मा जोड दिनुहोस्, "kara" ले कारण जनाउँछ',
        '"jouzu" - "jo" को लागि ओठ गोलो बनाउनुहोस्',
        '"ganbarimasu" - अन्त्यसम्म स्पष्ट रूपमा भन्नुहोस्',
      ],
    },
    keywords: [
      {
        word: '働く',
        reading: 'はたらく',
        meaning: { en: 'to work', vi: 'làm việc', zh: '工作', my: 'အလုပ်လုပ်သည်', ne: 'काम गर्नु' },
      },
      {
        word: '頑張る',
        reading: 'がんばる',
        meaning: { en: 'to do one\'s best', vi: 'cố gắng', zh: '努力', my: 'ကြိုးစားသည်', ne: 'प्रयास गर्नु' },
      },
    ],
    duration: 11,
  },
  {
    id: 'lesson-015',
    title: '電車（でんしゃ）のアナウンス',
    level: 'N4',
    category: '交通（こうつう）',
    audioUrl: '/audio/N4/lesson-015.wav',
    script: {
      japanese: 'つぎは しんじゅくえきです。おのりかえの おきゃくさまは こちらで おおりください。でぐちは みぎがわです。おわすれものに ごちゅうい ください。',
      japanesePlain: 'つぎはしんじゅくえきですおのりかえのおきゃくさまはこちらでおおりくださいでぐちはみぎがわですおわすれものにごちゅういください',
      japaneseKanji: '次は新宿駅です。お乗り換えのお客様はこちらでお降りください。出口は右側です。お忘れ物にご注意ください。',
    },
    translations: {
      en: 'The next station is Shinjuku. Passengers transferring, please get off here. The exit is on the right side. Please be careful not to leave your belongings behind.',
      vi: 'Trạm tiếp theo là Shinjuku. Quý khách chuyển tàu xin xuống tại đây. Lối ra ở bên phải. Xin hãy cẩn thận đừng để quên đồ.',
      zh: '下一站是新宿站。换乘的乘客请在这里下车。出口在右边。请注意不要遗忘物品。',
      my: 'နောက်ဘူတာက Shinjuku ဖြစ်ပါတယ်။ ရထားပြောင်းစီးမယ့် ခရီးသည်များ ဒီမှာ ဆင်းပါ။ ထွက်ပေါက်က ညာဘက်ဖြစ်ပါတယ်။ ပစ္စည်းမမေ့ပါနဲ့။',
      ne: 'अर्को स्टेशन शिन्जुकु हो। ट्रेन सट्ने यात्रुहरू कृपया यहाँ ओर्लनुहोस्। निकास दायाँ तिर छ। कृपया सामान नबिर्सनुहोस्।',
    },
    pronunciationTips: {
      ja: [
        '「しんじゅく」→ 「ん」と「じゅ」をはっきり区別',
        '「おのりかえ」→ 丁寧語の「お」を忘れない',
        '「ごちゅうい」→ 「ちゅう」は口を丸めて',
      ],
      en: [
        '"Shinjuku" - Clearly distinguish "n" and "ju"',
        '"o-norikae" - Don\'t forget the polite prefix "o"',
        '"go-chuui" - Round your lips for "chuu"',
      ],
      vi: [
        '"Shinjuku" - Phân biệt rõ "n" và "ju"',
        '"o-norikae" - Đừng quên tiền tố lịch sự "o"',
        '"go-chuui" - Làm tròn môi khi phát âm "chuu"',
      ],
      zh: [
        '「しんじゅく」→ 「ん」和「じゅ」要清楚区分',
        '「おのりかえ」→ 不要忘记礼貌前缀「お」',
        '「ごちゅうい」→ 发「ちゅう」时嘴唇要圆',
      ],
      my: [
        '"Shinjuku" - "n" နှင့် "ju" ကို ရှင်းရှင်းလင်းလင်း ခွဲခြားပါ',
        '"o-norikae" - ယဉ်ကျေးသော ရှေ့ဆက် "o" ကို မမေ့ပါနဲ့',
        '"go-chuui" - "chuu" အတွက် နှုတ်ခမ်းကို ဝိုင်းအောင်လုပ်ပါ',
      ],
      ne: [
        '"Shinjuku" - "n" र "ju" स्पष्ट रूपमा छुट्ट्याउनुहोस्',
        '"o-norikae" - नम्र उपसर्ग "o" नबिर्सनुहोस्',
        '"go-chuui" - "chuu" को लागि ओठ गोलो बनाउनुहोस्',
      ],
    },
    keywords: [
      {
        word: '乗り換え',
        reading: 'のりかえ',
        meaning: { en: 'transfer (train)', vi: 'chuyển tàu', zh: '换乘', my: 'ရထားပြောင်းစီးခြင်း', ne: 'ट्रेन सट्नु' },
      },
      {
        word: '忘れ物',
        reading: 'わすれもの',
        meaning: { en: 'lost item / forgotten belongings', vi: 'đồ bỏ quên', zh: '遗忘物品', my: 'မေ့ကျန်ပစ္စည်း', ne: 'बिर्सिएको सामान' },
      },
    ],
    duration: 10,
  },

  // ============================================
  // N3レベル（5レッスン）
  // 複合文・敬語・意見表明など
  // ============================================
  {
    id: 'lesson-016',
    title: '旅行（りょこう）の計画（けいかく）',
    level: 'N3',
    category: '日常（にちじょう）',
    audioUrl: '/audio/N3/lesson-016.wav',
    script: {
      japanese: 'らいげつ きょうとに りょこうに いく よていです。きょうとには おてらや じんじゃが たくさん あって、とくに あきは こうようが きれいだそうです。ともだちに すすめられて、きめました。にはくみっかの よていで、りょかんに とまる つもりです。たのしみに しています。',
      japanesePlain: 'らいげつきょうとにりょこうにいくよていですきょうとにはおてらやじんじゃがたくさんあってとくにあきはこうようがきれいだそうですともだちにすすめられてきめましたにはくみっかのよていでりょかんにとまるつもりですたのしみにしています',
      japaneseKanji: '来月京都に旅行に行く予定です。京都にはお寺や神社がたくさんあって、特に秋は紅葉がきれいだそうです。友達に勧められて、決めました。2泊3日の予定で、旅館に泊まるつもりです。楽しみにしています。',
      japaneseWithRuby: '<ruby>来月<rp>(</rp><rt>らいげつ</rt><rp>)</rp></ruby><ruby>京都<rp>(</rp><rt>きょうと</rt><rp>)</rp></ruby>に<ruby>旅行<rp>(</rp><rt>りょこう</rt><rp>)</rp></ruby>に<ruby>行<rp>(</rp><rt>い</rt><rp>)</rp></ruby>く<ruby>予定<rp>(</rp><rt>よてい</rt><rp>)</rp></ruby>です。<ruby>京都<rp>(</rp><rt>きょうと</rt><rp>)</rp></ruby>にはお<ruby>寺<rp>(</rp><rt>てら</rt><rp>)</rp></ruby>や<ruby>神社<rp>(</rp><rt>じんじゃ</rt><rp>)</rp></ruby>がたくさんあって、<ruby>特<rp>(</rp><rt>とく</rt><rp>)</rp></ruby>に<ruby>秋<rp>(</rp><rt>あき</rt><rp>)</rp></ruby>は<ruby>紅葉<rp>(</rp><rt>こうよう</rt><rp>)</rp></ruby>がきれいだそうです。<ruby>友達<rp>(</rp><rt>ともだち</rt><rp>)</rp></ruby>に<ruby>勧<rp>(</rp><rt>すす</rt><rp>)</rp></ruby>められて、<ruby>決<rp>(</rp><rt>き</rt><rp>)</rp></ruby>めました。2<ruby>泊<rp>(</rp><rt>はく</rt><rp>)</rp></ruby>3<ruby>日<rp>(</rp><rt>か</rt><rp>)</rp></ruby>の<ruby>予定<rp>(</rp><rt>よてい</rt><rp>)</rp></ruby>で、<ruby>旅館<rp>(</rp><rt>りょかん</rt><rp>)</rp></ruby>に<ruby>泊<rp>(</rp><rt>と</rt><rp>)</rp></ruby>まるつもりです。<ruby>楽<rp>(</rp><rt>たの</rt><rp>)</rp></ruby>しみにしています。',
    },
    translations: {
      en: 'I\'m planning to travel to Kyoto next month. Kyoto has many temples and shrines, and I\'ve heard the autumn leaves are especially beautiful. A friend recommended it, so I decided to go. I plan to stay for two nights and three days at a ryokan. I\'m looking forward to it.',
      vi: 'Tháng sau tôi dự định đi du lịch Kyoto. Kyoto có nhiều chùa và đền thần, và nghe nói mùa thu lá đỏ rất đẹp. Bạn bè giới thiệu nên tôi đã quyết định đi. Dự định ở 2 đêm 3 ngày tại nhà trọ kiểu Nhật. Tôi rất mong chờ.',
      zh: '下个月打算去京都旅行。京都有很多寺庙和神社，听说秋天的红叶特别美。朋友推荐的，所以决定去了。计划住两晚三天，打算住旅馆。很期待。',
      my: 'နောက်လ Kyoto ကို ခရီးသွားဖို့ စီစဉ်ထားပါတယ်။ Kyoto မှာ ဘုရားကျောင်းနဲ့ နတ်ကွန်းတွေ အများကြီးရှိပြီး အထူးသဖြင့် ဆောင်းဦးမှာ အရွက်နီတွေ လှတယ်လို့ ကြားပါတယ်။ သူငယ်ချင်းက အကြံပေးလို့ ဆုံးဖြတ်လိုက်တာပါ။ ၂ ညအိပ် ၃ ရက် စီစဉ်ပြီး ဂျပန်ဟိုတယ်မှာ တည်းခိုဖို့ ရည်ရွယ်ပါတယ်။ မျှော်လင့်နေပါတယ်။',
      ne: 'अर्को महिना क्योटोमा घुम्न जाने योजना छ। क्योटोमा धेरै मन्दिर र देवालयहरू छन्, र शरदमा रातो पातहरू विशेष गरी सुन्दर हुन्छन् भन्ने सुनेको छु। साथीले सिफारिस गरेर निर्णय गरें। २ रात ३ दिनको योजनामा र्योकानमा बस्ने विचार छ। म उत्साहित छु।',
    },
    pronunciationTips: {
      ja: [
        '「だそうです」→ 伝聞の「そう」を自然に',
        '「すすめられて」→ 受身形の「られて」をなめらかに',
        '「にはくみっか」→ 「っ」で一瞬止まる',
      ],
      en: [
        '"da sou desu" - Say the hearsay "sou" naturally',
        '"susumerarete" - Smoothly pronounce the passive "rarete"',
        '"ni-haku mikka" - Pause briefly at the double consonant',
      ],
      vi: [
        '"da sou desu" - Nói "sou" truyền đạt tin đồn một cách tự nhiên',
        '"susumerarete" - Phát âm thể bị động "rarete" mượt mà',
        '"ni-haku mikka" - Dừng một chút ở phụ âm kép',
      ],
      zh: [
        '「だそうです」→ 传闻的「そう」要自然地说',
        '「すすめられて」→ 被动形「られて」要流畅',
        '「にはくみっか」→ 促音「っ」处短暂停顿',
      ],
      my: [
        '"da sou desu" - ကြားသိချက် "sou" ကို သဘာဝကျကျ ပြောပါ',
        '"susumerarete" - passive "rarete" ကို ချောမွေ့စွာ အသံထွက်ပါ',
        '"ni-haku mikka" - နှစ်ထပ်ဗျည်းတွင် ခဏရပ်ပါ',
      ],
      ne: [
        '"da sou desu" - सुनेको कुरा "sou" प्राकृतिक रूपमा भन्नुहोस्',
        '"susumerarete" - कर्मवाच्य "rarete" चिल्लो रूपमा उच्चारण गर्नुहोस्',
        '"ni-haku mikka" - दोहोरो व्यञ्जनमा छोटो विराम लिनुहोस्',
      ],
    },
    keywords: [
      {
        word: '紅葉',
        reading: 'こうよう',
        meaning: { en: 'autumn leaves', vi: 'lá đỏ mùa thu', zh: '红叶', my: 'ဆောင်းဦးအရွက်နီ', ne: 'शरदको रातो पात' },
      },
      {
        word: '旅館',
        reading: 'りょかん',
        meaning: { en: 'Japanese inn', vi: 'nhà trọ kiểu Nhật', zh: '旅馆', my: 'ဂျပန်ဧည့်ရိပ်သာ', ne: 'जापानी सराय' },
      },
      {
        word: '予定',
        reading: 'よてい',
        meaning: { en: 'plan / schedule', vi: 'kế hoạch / lịch trình', zh: '计划 / 日程', my: 'အစီအစဉ်', ne: 'योजना / तालिका' },
      },
    ],
    duration: 15,
  },
  {
    id: 'lesson-017',
    title: '先生（せんせい）への相談（そうだん）',
    level: 'N3',
    category: '学校（がっこう）',
    audioUrl: '/audio/N3/lesson-017.wav',
    script: {
      japanese: 'せんせい、すこし そうだんが あるんですが。じつは さいきん じゅぎょうの ないようが むずかしくなってきて、ついていけなくなっています。とくに かんじの よみかたが わかりません。なにか いいほうほうは ありませんか。べんきょうの しかたを おしえていただけませんか。',
      japanesePlain: 'せんせいすこしそうだんがあるんですがじつはさいきんじゅぎょうのないようがむずかしくなってきてついていけなくなっていますとくにかんじのよみかたがわかりませんなにかいいほうほうはありませんかべんきょうのしかたをおしえていただけませんか',
      japaneseKanji: '先生、少し相談があるんですが。実は最近授業の内容が難しくなってきて、ついていけなくなっています。特に漢字の読み方が分かりません。何かいい方法はありませんか。勉強の仕方を教えていただけませんか。',
      japaneseWithRuby: '<ruby>先生<rp>(</rp><rt>せんせい</rt><rp>)</rp></ruby>、<ruby>少<rp>(</rp><rt>すこ</rt><rp>)</rp></ruby>し<ruby>相談<rp>(</rp><rt>そうだん</rt><rp>)</rp></ruby>があるんですが。<ruby>実<rp>(</rp><rt>じつ</rt><rp>)</rp></ruby>は<ruby>最近<rp>(</rp><rt>さいきん</rt><rp>)</rp></ruby><ruby>授業<rp>(</rp><rt>じゅぎょう</rt><rp>)</rp></ruby>の<ruby>内容<rp>(</rp><rt>ないよう</rt><rp>)</rp></ruby>が<ruby>難<rp>(</rp><rt>むずか</rt><rp>)</rp></ruby>しくなってきて、ついていけなくなっています。<ruby>特<rp>(</rp><rt>とく</rt><rp>)</rp></ruby>に<ruby>漢字<rp>(</rp><rt>かんじ</rt><rp>)</rp></ruby>の<ruby>読<rp>(</rp><rt>よ</rt><rp>)</rp></ruby>み<ruby>方<rp>(</rp><rt>かた</rt><rp>)</rp></ruby>が<ruby>分<rp>(</rp><rt>わ</rt><rp>)</rp></ruby>かりません。<ruby>何<rp>(</rp><rt>なに</rt><rp>)</rp></ruby>かいい<ruby>方法<rp>(</rp><rt>ほうほう</rt><rp>)</rp></ruby>はありませんか。<ruby>勉強<rp>(</rp><rt>べんきょう</rt><rp>)</rp></ruby>の<ruby>仕方<rp>(</rp><rt>しかた</rt><rp>)</rp></ruby>を<ruby>教<rp>(</rp><rt>おし</rt><rp>)</rp></ruby>えていただけませんか。',
    },
    translations: {
      en: 'Teacher, I have something I\'d like to discuss. Actually, the class content has been getting harder recently, and I\'m having trouble keeping up. I especially don\'t understand how to read kanji. Is there a good method? Could you teach me how to study?',
      vi: 'Thưa thầy/cô, em muốn hỏi một chút ạ. Thực ra gần đây nội dung bài học ngày càng khó, em không theo kịp được. Đặc biệt em không hiểu cách đọc chữ Hán. Có phương pháp nào tốt không ạ? Thầy/cô có thể dạy em cách học không ạ?',
      zh: '老师，我想商量一下。其实最近课程内容变难了，我跟不上了。特别是不知道汉字怎么读。有什么好方法吗？能教我学习方法吗？',
      my: 'ဆရာ၊ အနည်းငယ် တိုင်ပင်ချင်ပါတယ်။ တကယ်တော့ မကြာသေးခင်က သင်ခန်းစာတွေ ခက်လာပြီး လိုက်မမီတော့ပါ။ အထူးသဖြင့် ခန်းဂျိ ဖတ်ပုံ နားမလည်ပါ။ ကောင်းတဲ့ နည်းလမ်း ရှိပါသလား။ လေ့လာနည်း သင်ပေးနိုင်မလား။',
      ne: 'शिक्षक, अलिकति सल्लाह लिन चाहन्छु। वास्तवमा हालै कक्षाको सामग्री गाह्रो हुँदै गएको छ, म भ्याउन सकिरहेको छैन। विशेष गरी कान्जी पढ्ने तरिका थाहा छैन। कुनै राम्रो तरिका छ? अध्ययनको तरिका सिकाउन सक्नुहुन्छ?',
    },
    pronunciationTips: {
      ja: [
        '「あるんですが」→ 「んです」で切り出しの柔らかさ',
        '「ついていけなくなっています」→ 長い動詞を区切って練習',
        '「いただけませんか」→ 丁寧な依頼表現、語尾を上げる',
      ],
      en: [
        '"arun desu ga" - "n desu" softens the introduction',
        '"tsuiteikenakunatte imasu" - Practice breaking up this long verb phrase',
        '"itadakemasen ka" - Polite request expression, raise intonation at the end',
      ],
      vi: [
        '"arun desu ga" - "n desu" làm mềm cách mở đầu',
        '"tsuiteikenakunatte imasu" - Tập chia nhỏ cụm động từ dài này',
        '"itadakemasen ka" - Cách nói yêu cầu lịch sự, nâng giọng cuối câu',
      ],
      zh: [
        '「あるんですが」→ 「んです」使开头更委婉',
        '「ついていけなくなっています」→ 把长动词分段练习',
        '「いただけませんか」→ 礼貌的请求表达，句尾语调上扬',
      ],
      my: [
        '"arun desu ga" - "n desu" သည် စကားစမြည်းကို ပျော့ပျောင်းစေသည်',
        '"tsuiteikenakunatte imasu" - ရှည်လျားသော ကြိယာကို ပိုင်းခြားပြီး လေ့ကျင့်ပါ',
        '"itadakemasen ka" - ယဉ်ကျေးသော တောင်းဆိုချက်၊ အဆုံးတွင် အသံမြှင့်ပါ',
      ],
      ne: [
        '"arun desu ga" - "n desu" ले सुरुवात नरम बनाउँछ',
        '"tsuiteikenakunatte imasu" - लामो क्रिया वाक्यांशलाई टुक्रा पारेर अभ्यास गर्नुहोस्',
        '"itadakemasen ka" - नम्र अनुरोध अभिव्यक्ति, अन्त्यमा स्वर उठाउनुहोस्',
      ],
    },
    keywords: [
      {
        word: '相談',
        reading: 'そうだん',
        meaning: { en: 'consultation', vi: 'tư vấn / tham khảo', zh: '商量', my: 'တိုင်ပင်ခြင်း', ne: 'सल्लाह' },
      },
      {
        word: '授業',
        reading: 'じゅぎょう',
        meaning: { en: 'class / lesson', vi: 'bài học / lớp học', zh: '课程', my: 'သင်ခန်းစာ', ne: 'कक्षा' },
      },
      {
        word: '方法',
        reading: 'ほうほう',
        meaning: { en: 'method', vi: 'phương pháp', zh: '方法', my: 'နည်းလမ်း', ne: 'तरिका' },
      },
    ],
    duration: 16,
  },
  {
    id: 'lesson-018',
    title: 'アルバイト先（さき）での会話（かいわ）',
    level: 'N3',
    category: '仕事（しごと）',
    audioUrl: '/audio/N3/lesson-018.wav',
    script: {
      japanese: 'てんちょう、らいしゅうの きんようびは がっこうの ぎょうじが あるので、おやすみを いただきたいんですが。かわりに どようびに はいることが できます。シフトを かえていただけると たすかります。ごめいわくを おかけしますが、よろしく おねがいします。',
      japanesePlain: 'てんちょうらいしゅうのきんようびはがっこうのぎょうじがあるのでおやすみをいただきたいんですがかわりにどようびにはいることができますしふとをかえていただけるとたすかりますごめいわくをおかけしますがよろしくおねがいします',
      japaneseKanji: '店長、来週の金曜日は学校の行事があるので、お休みをいただきたいんですが。代わりに土曜日に入ることができます。シフトを変えていただけると助かります。ご迷惑をおかけしますが、よろしくお願いします。',
      japaneseWithRuby: '<ruby>店長<rp>(</rp><rt>てんちょう</rt><rp>)</rp></ruby>、<ruby>来週<rp>(</rp><rt>らいしゅう</rt><rp>)</rp></ruby>の<ruby>金曜日<rp>(</rp><rt>きんようび</rt><rp>)</rp></ruby>は<ruby>学校<rp>(</rp><rt>がっこう</rt><rp>)</rp></ruby>の<ruby>行事<rp>(</rp><rt>ぎょうじ</rt><rp>)</rp></ruby>があるので、お<ruby>休<rp>(</rp><rt>やす</rt><rp>)</rp></ruby>みをいただきたいんですが。<ruby>代<rp>(</rp><rt>か</rt><rp>)</rp></ruby>わりに<ruby>土曜日<rp>(</rp><rt>どようび</rt><rp>)</rp></ruby>に<ruby>入<rp>(</rp><rt>はい</rt><rp>)</rp></ruby>ることができます。シフトを<ruby>変<rp>(</rp><rt>か</rt><rp>)</rp></ruby>えていただけると<ruby>助<rp>(</rp><rt>たす</rt><rp>)</rp></ruby>かります。ご<ruby>迷惑<rp>(</rp><rt>めいわく</rt><rp>)</rp></ruby>をおかけしますが、よろしくお<ruby>願<rp>(</rp><rt>ねが</rt><rp>)</rp></ruby>いします。',
    },
    translations: {
      en: 'Manager, I\'d like to take Friday off next week because I have a school event. Instead, I can come in on Saturday. It would really help if you could change the shift. I\'m sorry for the inconvenience, and thank you for your understanding.',
      vi: 'Quản lý, thứ Sáu tuần sau trường có sự kiện nên em muốn xin nghỉ ạ. Thay vào đó em có thể đi làm thứ Bảy. Nếu đổi ca được thì rất cảm ơn ạ. Xin lỗi đã gây phiền, xin hãy giúp đỡ ạ.',
      zh: '店长，下周五学校有活动，所以想请假。我可以周六来代替。如果能换班的话就太好了。给您添麻烦了，拜托您了。',
      my: 'ဆိုင်မှူး၊ နောက်အပတ် သောကြာနေ့မှာ ကျောင်းပွဲရှိလို့ အနားယူခွင့် လိုချင်ပါတယ်။ အစားထိုး စနေနေ့မှာ ဝင်နိုင်ပါတယ်။ ရှစ်ဖ့်ပြောင်းပေးနိုင်ရင် ကျေးဇူးတင်ပါတယ်။ အနှောင့်အယှက် ဖြစ်ပါတယ်၊ ကျေးဇူးပြုပြီး ကူညီပါ။',
      ne: 'म्यानेजर, अर्को हप्ता शुक्रबार विद्यालयमा कार्यक्रम छ, त्यसैले बिदा लिन चाहन्छु। सट्टामा शनिबार आउन सक्छु। शिफ्ट बदलिदिनुभयो भने धन्यवाद हुन्थ्यो। असुविधाको लागि माफ चाहन्छु।',
    },
    pronunciationTips: {
      ja: [
        '「いただきたいんですが」→ 丁寧な希望表現',
        '「いただけると たすかります」→ 依頼の定型表現を覚える',
        '「ごめいわくを おかけします」→ ビジネス定型、なめらかに',
      ],
      en: [
        '"itadakitain desu ga" - Polite way to express a wish',
        '"itadakeru to tasukarimasu" - Memorize this standard request phrase',
        '"gomeiwaku o okake shimasu" - Business phrase, say it smoothly',
      ],
      vi: [
        '"itadakitain desu ga" - Cách lịch sự để bày tỏ mong muốn',
        '"itadakeru to tasukarimasu" - Nhớ cụm từ yêu cầu chuẩn này',
        '"gomeiwaku o okake shimasu" - Cụm từ thương mại, nói mượt mà',
      ],
      zh: [
        '「いただきたいんですが」→ 礼貌的愿望表达方式',
        '「いただけると たすかります」→ 记住这个标准请求句型',
        '「ごめいわくを おかけします」→ 商务用语，要流畅地说',
      ],
      my: [
        '"itadakitain desu ga" - ဆန္ဒကို ယဉ်ကျေးစွာ ဖော်ပြခြင်း',
        '"itadakeru to tasukarimasu" - ဤစံတောင်းဆိုချက် စကားစုကို မှတ်ပါ',
        '"gomeiwaku o okake shimasu" - စီးပွားရေး စကားစု၊ ချောမွေ့စွာ ပြောပါ',
      ],
      ne: [
        '"itadakitain desu ga" - इच्छा व्यक्त गर्ने नम्र तरिका',
        '"itadakeru to tasukarimasu" - यो मानक अनुरोध वाक्यांश सम्झनुहोस्',
        '"gomeiwaku o okake shimasu" - व्यापारिक वाक्यांश, सहज रूपमा भन्नुहोस्',
      ],
    },
    keywords: [
      {
        word: '行事',
        reading: 'ぎょうじ',
        meaning: { en: 'event', vi: 'sự kiện', zh: '活动', my: 'ပွဲအခမ်းအနား', ne: 'कार्यक्रम' },
      },
      {
        word: '迷惑',
        reading: 'めいわく',
        meaning: { en: 'inconvenience / trouble', vi: 'phiền phức', zh: '麻烦', my: 'အနှောင့်အယှက်', ne: 'असुविधा' },
      },
    ],
    duration: 14,
  },
  {
    id: 'lesson-019',
    title: '日本（にほん）の季節（きせつ）',
    level: 'N3',
    category: '日常（にちじょう）',
    audioUrl: '/audio/N3/lesson-019.wav',
    script: {
      japanese: 'にほんには しきが あります。はるは さくらが さいて、おはなみを します。なつは あつくて、はなびたいかいが にんきです。あきは こうようが うつくしく、やまに いくひとが おおいです。ふゆは ゆきが ふって、おんせんに はいるのが きもちいいです。どのきせつが いちばん すきですか。',
      japanesePlain: 'にほんにはしきがありますはるはさくらがさいておはなみをしますなつはあつくてはなびたいかいがにんきですあきはこうようがうつくしくやまにいくひとがおおいですふゆはゆきがふっておんせんにはいるのがきもちいいですどのきせつがいちばんすきですか',
      japaneseKanji: '日本には四季があります。春は桜が咲いて、お花見をします。夏は暑くて、花火大会が人気です。秋は紅葉が美しく、山に行く人が多いです。冬は雪が降って、温泉に入るのが気持ちいいです。どの季節が一番好きですか。',
      japaneseWithRuby: '<ruby>日本<rp>(</rp><rt>にほん</rt><rp>)</rp></ruby>には<ruby>四季<rp>(</rp><rt>しき</rt><rp>)</rp></ruby>があります。<ruby>春<rp>(</rp><rt>はる</rt><rp>)</rp></ruby>は<ruby>桜<rp>(</rp><rt>さくら</rt><rp>)</rp></ruby>が<ruby>咲<rp>(</rp><rt>さ</rt><rp>)</rp></ruby>いて、お<ruby>花見<rp>(</rp><rt>はなみ</rt><rp>)</rp></ruby>をします。<ruby>夏<rp>(</rp><rt>なつ</rt><rp>)</rp></ruby>は<ruby>暑<rp>(</rp><rt>あつ</rt><rp>)</rp></ruby>くて、<ruby>花火<rp>(</rp><rt>はなび</rt><rp>)</rp></ruby><ruby>大会<rp>(</rp><rt>たいかい</rt><rp>)</rp></ruby>が<ruby>人気<rp>(</rp><rt>にんき</rt><rp>)</rp></ruby>です。<ruby>秋<rp>(</rp><rt>あき</rt><rp>)</rp></ruby>は<ruby>紅葉<rp>(</rp><rt>こうよう</rt><rp>)</rp></ruby>が<ruby>美<rp>(</rp><rt>うつく</rt><rp>)</rp></ruby>しく、<ruby>山<rp>(</rp><rt>やま</rt><rp>)</rp></ruby>に<ruby>行<rp>(</rp><rt>い</rt><rp>)</rp></ruby>く<ruby>人<rp>(</rp><rt>ひと</rt><rp>)</rp></ruby>が<ruby>多<rp>(</rp><rt>おお</rt><rp>)</rp></ruby>いです。<ruby>冬<rp>(</rp><rt>ふゆ</rt><rp>)</rp></ruby>は<ruby>雪<rp>(</rp><rt>ゆき</rt><rp>)</rp></ruby>が<ruby>降<rp>(</rp><rt>ふ</rt><rp>)</rp></ruby>って、<ruby>温泉<rp>(</rp><rt>おんせん</rt><rp>)</rp></ruby>に<ruby>入<rp>(</rp><rt>はい</rt><rp>)</rp></ruby>るのが<ruby>気持<rp>(</rp><rt>きも</rt><rp>)</rp></ruby>ちいいです。どの<ruby>季節<rp>(</rp><rt>きせつ</rt><rp>)</rp></ruby>が<ruby>一番<rp>(</rp><rt>いちばん</rt><rp>)</rp></ruby><ruby>好<rp>(</rp><rt>す</rt><rp>)</rp></ruby>きですか。',
    },
    translations: {
      en: 'Japan has four seasons. In spring, cherry blossoms bloom and people have flower viewing parties. Summer is hot, and fireworks festivals are popular. In autumn, the colored leaves are beautiful, and many people go to the mountains. In winter, it snows, and it feels great to soak in hot springs. Which season do you like the most?',
      vi: 'Nhật Bản có bốn mùa. Mùa xuân hoa anh đào nở, mọi người đi ngắm hoa. Mùa hè nóng, lễ hội pháo hoa rất được yêu thích. Mùa thu lá đỏ rất đẹp, nhiều người đi leo núi. Mùa đông tuyết rơi, tắm suối nước nóng rất thoải mái. Bạn thích mùa nào nhất?',
      zh: '日本有四个季节。春天樱花盛开，大家赏花。夏天很热，烟花大会很受欢迎。秋天红叶很美，去山里的人很多。冬天下雪，泡温泉很舒服。你最喜欢哪个季节？',
      my: 'ဂျပန်မှာ ရာသီ ၄ ခုရှိပါတယ်။ နွေဦးမှာ ချယ်ရီပန်း ပွင့်ပြီး ပန်းကြည့်ပွဲ လုပ်ပါတယ်။ နွေရာသီ ပူပြီး မီးရှူးမီးပန်းပွဲ နာမည်ကြီးပါတယ်။ ဆောင်းဦးမှာ အရွက်နီတွေ လှပြီး တောင်တက်သူ များပါတယ်။ ဆောင်းရာသီ နှင်းကျပြီး ရေပူစမ်း ဝင်ရတာ သက်သာပါတယ်။ ဘယ်ရာသီကို အကြိုက်ဆုံးလဲ။',
      ne: 'जापानमा चार ऋतुहरू हुन्छन्। वसन्तमा चेरी फूल फुल्छन् र मानिसहरू फूल हेर्न जान्छन्। गर्मी तातो हुन्छ र आतिशबाजी उत्सव लोकप्रिय छ। शरदमा रंगीन पातहरू सुन्दर हुन्छन् र धेरै मानिसहरू पहाड जान्छन्। जाडोमा हिउँ पर्छ र तातोपानीको कुण्डमा डुब्न रमाइलो हुन्छ। तपाईँलाई कुन ऋतु सबभन्दा मन पर्छ?',
    },
    pronunciationTips: {
      ja: [
        '「しき」→ 「し」と「き」を明確に分ける',
        '「はなびたいかい」→ 「たいかい」の「い」を伸ばす',
        '「きもちいい」→ 「もち」にアクセント',
      ],
      en: [
        '"shiki" - Clearly separate "shi" and "ki"',
        '"hanabi taikai" - Extend the "i" in "taikai"',
        '"kimochiii" - Put the accent on "mochi"',
      ],
      vi: [
        '"shiki" - Tách rõ "shi" và "ki"',
        '"hanabi taikai" - Kéo dài âm "i" trong "taikai"',
        '"kimochiii" - Đặt trọng âm vào "mochi"',
      ],
      zh: [
        '「しき」→ 「し」和「き」要清楚分开',
        '「はなびたいかい」→ 「たいかい」的「い」要拉长',
        '「きもちいい」→ 重音放在「もち」上',
      ],
      my: [
        '"shiki" - "shi" နှင့် "ki" ကို ရှင်းရှင်းလင်းလင်း ခွဲပါ',
        '"hanabi taikai" - "taikai" ထဲက "i" ကို ဆွဲပါ',
        '"kimochiii" - "mochi" တွင် အသံလေယူပါ',
      ],
      ne: [
        '"shiki" - "shi" र "ki" स्पष्ट रूपमा छुट्ट्याउनुहोस्',
        '"hanabi taikai" - "taikai" को "i" लामो बनाउनुहोस्',
        '"kimochiii" - "mochi" मा बल दिनुहोस्',
      ],
    },
    keywords: [
      {
        word: '四季',
        reading: 'しき',
        meaning: { en: 'four seasons', vi: 'bốn mùa', zh: '四季', my: 'ရာသီလေးခု', ne: 'चार ऋतु' },
      },
      {
        word: '花火大会',
        reading: 'はなびたいかい',
        meaning: { en: 'fireworks festival', vi: 'lễ hội pháo hoa', zh: '烟花大会', my: 'မီးရှူးမီးပန်းပွဲ', ne: 'आतिशबाजी उत्सव' },
      },
      {
        word: '温泉',
        reading: 'おんせん',
        meaning: { en: 'hot spring', vi: 'suối nước nóng', zh: '温泉', my: 'ရေပူစမ်း', ne: 'तातोपानीको कुण्ड' },
      },
    ],
    duration: 18,
  },
  {
    id: 'lesson-020',
    title: '友達（ともだち）への手紙（てがみ）',
    level: 'N3',
    category: '日常（にちじょう）',
    audioUrl: '/audio/N3/lesson-020.wav',
    script: {
      japanese: 'おげんきですか。にほんに きてから もう はんとしに なりました。さいしょは ことばが つうじなくて たいへんでしたが、いまは すこしずつ にほんごが わかるように なってきました。らいねん、くにに かえったら、あいに いきますね。からだに きをつけてください。では、また。',
      japanesePlain: 'おげんきですかにほんにきてからもうはんとしになりましたさいしょはことばがつうじなくてたいへんでしたがいまはすこしずつにほんごがわかるようになってきましたらいねんくににかえったらあいにいきますねからだにきをつけてくださいではまた',
      japaneseKanji: 'お元気ですか。日本に来てからもう半年になりました。最初は言葉が通じなくて大変でしたが、今は少しずつ日本語が分かるようになってきました。来年、国に帰ったら、会いに行きますね。体に気をつけてください。では、また。',
      japaneseWithRuby: 'お<ruby>元気<rp>(</rp><rt>げんき</rt><rp>)</rp></ruby>ですか。<ruby>日本<rp>(</rp><rt>にほん</rt><rp>)</rp></ruby>に<ruby>来<rp>(</rp><rt>き</rt><rp>)</rp></ruby>てからもう<ruby>半年<rp>(</rp><rt>はんとし</rt><rp>)</rp></ruby>になりました。<ruby>最初<rp>(</rp><rt>さいしょ</rt><rp>)</rp></ruby>は<ruby>言葉<rp>(</rp><rt>ことば</rt><rp>)</rp></ruby>が<ruby>通<rp>(</rp><rt>つう</rt><rp>)</rp></ruby>じなくて<ruby>大変<rp>(</rp><rt>たいへん</rt><rp>)</rp></ruby>でしたが、<ruby>今<rp>(</rp><rt>いま</rt><rp>)</rp></ruby>は<ruby>少<rp>(</rp><rt>すこ</rt><rp>)</rp></ruby>しずつ<ruby>日本語<rp>(</rp><rt>にほんご</rt><rp>)</rp></ruby>が<ruby>分<rp>(</rp><rt>わ</rt><rp>)</rp></ruby>かるようになってきました。<ruby>来年<rp>(</rp><rt>らいねん</rt><rp>)</rp></ruby>、<ruby>国<rp>(</rp><rt>くに</rt><rp>)</rp></ruby>に<ruby>帰<rp>(</rp><rt>かえ</rt><rp>)</rp></ruby>ったら、<ruby>会<rp>(</rp><rt>あ</rt><rp>)</rp></ruby>いに<ruby>行<rp>(</rp><rt>い</rt><rp>)</rp></ruby>きますね。<ruby>体<rp>(</rp><rt>からだ</rt><rp>)</rp></ruby>に<ruby>気<rp>(</rp><rt>き</rt><rp>)</rp></ruby>をつけてください。では、また。',
    },
    translations: {
      en: 'How are you? It\'s already been half a year since I came to Japan. At first, it was hard because I couldn\'t communicate, but now I\'m gradually understanding Japanese. Next year, when I go back to my country, I\'ll come visit you. Please take care of yourself. Well then, see you.',
      vi: 'Bạn có khỏe không? Đã nửa năm kể từ khi tôi đến Nhật. Lúc đầu rất khó khăn vì không giao tiếp được, nhưng bây giờ tôi đang dần hiểu tiếng Nhật. Năm sau khi về nước, tôi sẽ đến thăm bạn nhé. Hãy giữ gìn sức khỏe. Vậy nhé, hẹn gặp lại.',
      zh: '你好吗？来日本已经半年了。刚开始语言不通很辛苦，但现在渐渐能听懂日语了。明年回国的时候，我会去看你的。请保重身体。那么，再见。',
      my: 'နေကောင်းလား။ ဂျပန်ရောက်တာ နှစ်ဝက်ရှိပြီ။ အစတုန်းက စကားမပြောတတ်လို့ ခက်ခဲခဲ့ပေမယ့် အခု ဂျပန်စာ တဖြည်းဖြည်း နားလည်လာပါပြီ။ နောက်နှစ် ပြည်ပြန်ရင် လာလည်ပါမယ်နော်။ ကျန်းမာပါစေ။ ဒါဆို ပြန်ဆုံကြတာပေါ့။',
      ne: 'सन्चै हुनुहुन्छ? जापान आएको आधा वर्ष भइसक्यो। सुरुमा भाषा नबुझेर गाह्रो भयो, तर अहिले बिस्तारै जापानी बुझ्न थालेको छु। अर्को वर्ष देश फर्किँदा भेट्न आउँछु है। शरीरको ख्याल राख्नुहोस्। त्यसो भए, फेरि भेटौँला।',
    },
    pronunciationTips: {
      ja: [
        '「つうじなくて」→ 「つう」を伸ばして「じ」をはっきり',
        '「わかるように なってきました」→ 変化の表現を自然に',
        '「きをつけて」→ 「き」にアクセント',
      ],
      en: [
        '"tsuujinakute" - Extend "tsuu" and pronounce "ji" clearly',
        '"wakaru you ni natte kimashita" - Say the change expression naturally',
        '"ki o tsukete" - Put the accent on "ki"',
      ],
      vi: [
        '"tsuujinakute" - Kéo dài "tsuu" và phát âm rõ "ji"',
        '"wakaru you ni natte kimashita" - Nói biểu đạt sự thay đổi một cách tự nhiên',
        '"ki o tsukete" - Đặt trọng âm vào "ki"',
      ],
      zh: [
        '「つうじなくて」→ 「つう」要拉长，「じ」要发音清晰',
        '「わかるように なってきました」→ 表达变化要自然',
        '「きをつけて」→ 重音放在「き」上',
      ],
      my: [
        '"tsuujinakute" - "tsuu" ကို ဆွဲပြီး "ji" ကို ရှင်းရှင်းလင်းလင်း အသံထွက်ပါ',
        '"wakaru you ni natte kimashita" - ပြောင်းလဲမှု အသံထွက်ကို သဘာဝကျကျ ပြောပါ',
        '"ki o tsukete" - "ki" တွင် အသံလေယူပါ',
      ],
      ne: [
        '"tsuujinakute" - "tsuu" लामो बनाउनुहोस् र "ji" स्पष्ट उच्चारण गर्नुहोस्',
        '"wakaru you ni natte kimashita" - परिवर्तनको अभिव्यक्ति प्राकृतिक रूपमा भन्नुहोस्',
        '"ki o tsukete" - "ki" मा बल दिनुहोस्',
      ],
    },
    keywords: [
      {
        word: '半年',
        reading: 'はんとし',
        meaning: { en: 'half a year', vi: 'nửa năm', zh: '半年', my: 'နှစ်ဝက်', ne: 'आधा वर्ष' },
      },
      {
        word: '通じる',
        reading: 'つうじる',
        meaning: { en: 'to be understood / communicate', vi: 'giao tiếp được', zh: '通', my: 'ဆက်သွယ်ပြောဆိုသည်', ne: 'बुझिनु / सम्प्रेषण हुनु' },
      },
    ],
    duration: 17,
  },

  // ============================================
  // N2レベル（5レッスン）
  // 長文・ニュース調・抽象的表現など
  // ============================================
  {
    id: 'lesson-021',
    title: '環境問題について',
    level: 'N2',
    category: '社会',
    audioUrl: '/audio/N2/lesson-021.wav',
    script: {
      japanese: 'さいきん かんきょうもんだいに かんする ニュースを よく みみにします。とくに ちきゅうおんだんかの えいきょうで、いじょうきしょうが ふえていると いわれています。わたしたちに できることは かぎられていますが、まいにちの せいかつの なかで、しょうエネルギーや リサイクルを いしきすることが たいせつです。みらいの ために、ひとりひとりが こうどうする ひつようが あるのでは ないでしょうか。',
      japanesePlain: 'さいきんかんきょうもんだいにかんするにゅーすをよくみみにしますとくにちきゅうおんだんかのえいきょうでいじょうきしょうがふえているといわれていますわたしたちにできることはかぎられていますがまいにちのせいかつのなかでしょうえねるぎーやりさいくるをいしきすることがたいせつですみらいのためにひとりひとりがこうどうするひつようがあるのではないでしょうか',
      japaneseKanji: '最近、環境問題に関するニュースをよく耳にします。特に地球温暖化の影響で、異常気象が増えていると言われています。私たちにできることは限られていますが、毎日の生活の中で、省エネルギーやリサイクルを意識することが大切です。未来のために、一人一人が行動する必要があるのではないでしょうか。',
    },
    translations: {
      en: 'Recently, I often hear news about environmental issues. It is said that extreme weather events are increasing, especially due to the effects of global warming. While what we can do is limited, it is important to be conscious of energy saving and recycling in our daily lives. For the sake of the future, each and every one of us needs to take action, don\'t you think?',
      vi: 'Gần đây tôi thường nghe tin tức về vấn đề môi trường. Người ta nói rằng hiện tượng thời tiết bất thường đang tăng lên do ảnh hưởng của hiện tượng nóng lên toàn cầu. Tuy những gì chúng ta có thể làm còn hạn chế, nhưng việc ý thức tiết kiệm năng lượng và tái chế trong cuộc sống hàng ngày là rất quan trọng. Vì tương lai, mỗi người cần phải hành động, bạn có nghĩ vậy không?',
      zh: '最近经常听到有关环境问题的新闻。据说由于全球变暖的影响，极端天气正在增加。虽然我们能做的有限，但在日常生活中注意节能和回收利用是很重要的。为了未来，每个人都需要采取行动，不是吗？',
      my: 'မကြာသေးခင်က ပတ်ဝန်းကျင်ပြဿနာ သတင်းတွေ မကြာခဏ ကြားရပါတယ်။ အထူးသဖြင့် ကမ္ဘာ့ရာသီဥတု ပူနွေးလာမှုကြောင့် ရာသီဥတု ဆိုးဝါးမှုတွေ များလာတယ်လို့ ဆိုပါတယ်။ ကျွန်တော်တို့ လုပ်နိုင်တာ အကန့်အသတ်ရှိပေမယ့် နေ့စဉ်ဘဝမှာ စွမ်းအင်ချွေတာရေးနဲ့ ပြန်လည်အသုံးချရေးကို သတိထားတာ အရေးကြီးပါတယ်။ အနာဂတ်အတွက် လူတစ်ယောက်ချင်းစီ လုပ်ဆောင်ဖို့ လိုအပ်ပါတယ်။',
      ne: 'हालै वातावरणीय समस्याबारे समाचार धेरै सुनिन्छ। विशेष गरी विश्व तापक्रम वृद्धिको प्रभावले चरम मौसमी घटनाहरू बढ्दै गएको भनिन्छ। हामीले गर्न सक्ने कुरा सीमित भए पनि दैनिक जीवनमा ऊर्जा बचत र पुनर्चक्रणको बारेमा सचेत हुनु महत्त्वपूर्ण छ। भविष्यको लागि प्रत्येक व्यक्तिले कदम चाल्नुपर्छ होइन र?',
    },
    pronunciationTips: {
      ja: [
        '「かんきょうもんだい」→ 複合語を途切れずに',
        '「いわれています」→ 受身+進行の自然な発音',
        '「ないでしょうか」→ 提案の語尾を柔らかく',
      ],
      en: [
        '"kankyou mondai" - Say the compound word without breaking',
        '"iwarete imasu" - Natural pronunciation of passive + progressive',
        '"nai deshou ka" - Soften the suggestion ending',
      ],
      vi: [
        '"kankyou mondai" - Nói từ ghép mà không ngắt quãng',
        '"iwarete imasu" - Phát âm tự nhiên thể bị động + tiếp diễn',
        '"nai deshou ka" - Làm mềm giọng cuối câu gợi ý',
      ],
      zh: [
        '「かんきょうもんだい」→ 复合词不要断开',
        '「いわれています」→ 被动+进行的自然发音',
        '「ないでしょうか」→ 建议语气要柔和',
      ],
      my: [
        '"kankyou mondai" - ပေါင်းစပ်စကားကို မဖြတ်ဘဲ ပြောပါ',
        '"iwarete imasu" - passive + progressive ကို သဘာဝကျကျ အသံထွက်ပါ',
        '"nai deshou ka" - အဆိုပြုချက် အဆုံးကို ပျော့ပျောင်းစွာ ပြောပါ',
      ],
      ne: [
        '"kankyou mondai" - समस्त शब्द नतोडी भन्नुहोस्',
        '"iwarete imasu" - कर्मवाच्य + निरन्तरताको प्राकृतिक उच्चारण',
        '"nai deshou ka" - सुझावको अन्त्य नरम बनाउनुहोस्',
      ],
    },
    keywords: [
      {
        word: '環境問題',
        reading: 'かんきょうもんだい',
        meaning: { en: 'environmental issues', vi: 'vấn đề môi trường', zh: '环境问题', my: 'ပတ်ဝန်းကျင်ပြဿနာ', ne: 'वातावरणीय समस्या' },
      },
      {
        word: '地球温暖化',
        reading: 'ちきゅうおんだんか',
        meaning: { en: 'global warming', vi: 'nóng lên toàn cầu', zh: '全球变暖', my: 'ကမ္ဘာ့ရာသီဥတုပူနွေးလာမှု', ne: 'विश्व तापक्रम वृद्धि' },
      },
      {
        word: '異常気象',
        reading: 'いじょうきしょう',
        meaning: { en: 'extreme weather', vi: 'thời tiết bất thường', zh: '极端天气', my: 'ရာသီဥတုဆိုးဝါးမှု', ne: 'चरम मौसम' },
      },
    ],
    duration: 20,
  },
  {
    id: 'lesson-022',
    title: '就職活動の経験',
    level: 'N2',
    category: '仕事',
    audioUrl: '/audio/N2/lesson-022.wav',
    script: {
      japanese: 'しゅうしょくかつどうは ほんとうに たいへんでした。なんじゅっしゃも おうぼして、めんせつも なんどもうけました。さいしょは じしんが なくて、きんちょうして うまくはなせませんでした。しかし、せんぱいに アドバイスを もらったり、じぶんの つよみを さいかくにんしたりするうちに、すこしずつ じしんが ついてきました。さいしゅうてきに、じぶんに あったかいしゃに ないていを もらうことが できました。あきらめずに つづけることが だいじだと おもいます。',
      japanesePlain: 'しゅうしょくかつどうはほんとうにたいへんでしたなんじゅっしゃもおうぼしてめんせつもなんどもうけましたさいしょはじしんがなくてきんちょうしてうまくはなせませんでしたしかしせんぱいにあどばいすをもらったりじぶんのつよみをさいかくにんしたりするうちにすこしずつじしんがついてきましたさいしゅうてきにじぶんにあったかいしゃにないていをもらうことができましたあきらめずにつづけることがだいじだとおもいます',
      japaneseKanji: '就職活動は本当に大変でした。何十社も応募して、面接も何度も受けました。最初は自信がなくて、緊張してうまく話せませんでした。しかし、先輩にアドバイスをもらったり、自分の強みを再確認したりするうちに、少しずつ自信がついてきました。最終的に、自分に合った会社に内定をもらうことができました。諦めずに続けることが大事だと思います。',
    },
    translations: {
      en: 'Job hunting was really tough. I applied to dozens of companies and went through many interviews. At first, I had no confidence and was too nervous to speak well. However, as I received advice from seniors and reconfirmed my strengths, I gradually gained confidence. In the end, I was able to receive a job offer from a company that suited me. I believe it\'s important not to give up and keep going.',
      vi: 'Tìm việc thật sự rất vất vả. Tôi đã nộp đơn vào hàng chục công ty và phỏng vấn nhiều lần. Lúc đầu không tự tin, lo lắng nên không nói được tốt. Tuy nhiên, nhờ nhận lời khuyên từ tiền bối và xác nhận lại điểm mạnh của mình, tôi dần dần tự tin hơn. Cuối cùng, tôi đã nhận được lời mời làm việc từ công ty phù hợp. Tôi nghĩ việc không bỏ cuộc và tiếp tục là rất quan trọng.',
      zh: '找工作真的很辛苦。投了几十家公司的简历，也面试了很多次。一开始没有自信，紧张得说不好话。但是在得到前辈的建议和重新确认自己的优势后，渐渐有了信心。最终，我收到了适合自己的公司的录用通知。我认为不放弃坚持下去很重要。',
      my: 'အလုပ်ရှာတာ တကယ်ခက်ခဲပါတယ်။ ကုမ္ပဏီ ဆယ်ဂဏန်းနဲ့ လျှောက်ပြီး အင်တာဗျူးလည်း အကြိမ်ကြိမ် ဝင်ခဲ့ရပါတယ်။ အစတုန်းက ယုံကြည်မှု မရှိဘဲ စိတ်လှုပ်ရှားလို့ ကောင်းကောင်း မပြောနိုင်ပါ။ ဒါပေမယ့် အကြီးအကဲတွေ အကြံပေးတာနဲ့ ကိုယ့်အားသာချက်ကို ပြန်စစ်ဆေးတဲ့အခါ တဖြည်းဖြည်း ယုံကြည်မှု ရလာပါတယ်။ နောက်ဆုံးမှာ ကိုယ်နဲ့ သင့်တော်တဲ့ ကုမ္ပဏီကနေ အလုပ်ခန့်စာ ရခဲ့ပါတယ်။ မလက်လျှော့ဘဲ ဆက်လုပ်တာ အရေးကြီးတယ်လို့ ထင်ပါတယ်။',
      ne: 'रोजगारीको खोजी साँच्चै गाह्रो थियो। दर्जनौं कम्पनीहरूमा आवेदन दिएँ र धेरै पटक अन्तर्वार्ता दिएँ। सुरुमा आत्मविश्वास नभएर, घबराएर राम्ररी बोल्न सकिनँ। तर, दाजुदीदीबाट सल्लाह पाउँदा र आफ्नो बलियो पक्ष पुनः पुष्टि गर्दा बिस्तारै आत्मविश्वास बढ्यो। अन्ततः आफूलाई मिल्ने कम्पनीबाट जागिरको प्रस्ताव पाएँ। नछाड्नु र जारी राख्नु महत्त्वपूर्ण छ भन्ने मलाई लाग्छ।',
    },
    pronunciationTips: {
      ja: [
        '「しゅうしょくかつどう」→ 長い複合語を一息で',
        '「〜たり〜たりするうちに」→ 列挙の表現をリズムよく',
        '「あきらめずに」→ 「ず」は「す」に近い発音',
      ],
      en: [
        '"shuushoku katsudou" - Say the long compound word in one breath',
        '"~tari ~tari suru uchi ni" - Say the listing expression rhythmically',
        '"akiramezu ni" - "zu" is pronounced close to "su"',
      ],
      vi: [
        '"shuushoku katsudou" - Nói từ ghép dài trong một hơi',
        '"~tari ~tari suru uchi ni" - Nói biểu đạt liệt kê một cách nhịp nhàng',
        '"akiramezu ni" - "zu" phát âm gần giống "su"',
      ],
      zh: [
        '「しゅうしょくかつどう」→ 长复合词一口气说完',
        '「〜たり〜たりするうちに」→ 列举表达要有节奏',
        '「あきらめずに」→ 「ず」的发音接近「す」',
      ],
      my: [
        '"shuushoku katsudou" - ရှည်လျားသော ပေါင်းစပ်စကားကို တစ်ရှူးတည်းပြောပါ',
        '"~tari ~tari suru uchi ni" - စာရင်းပြုစကားကို ချီတုံချီတုံ ပြောပါ',
        '"akiramezu ni" - "zu" ကို "su" နဲ့ နီးနီး အသံထွက်ပါ',
      ],
      ne: [
        '"shuushoku katsudou" - लामो समस्त शब्द एक सासमा भन्नुहोस्',
        '"~tari ~tari suru uchi ni" - सूचीकरण अभिव्यक्ति लयबद्ध रूपमा भन्नुहोस्',
        '"akiramezu ni" - "zu" को उच्चारण "su" जस्तो गर्नुहोस्',
      ],
    },
    keywords: [
      {
        word: '就職活動',
        reading: 'しゅうしょくかつどう',
        meaning: { en: 'job hunting', vi: 'tìm việc', zh: '求职活动', my: 'အလုပ်ရှာခြင်း', ne: 'रोजगारीको खोजी' },
      },
      {
        word: '内定',
        reading: 'ないてい',
        meaning: { en: 'job offer', vi: 'lời mời làm việc', zh: '录用通知', my: 'အလုပ်ခန့်စာ', ne: 'जागिरको प्रस्ताव' },
      },
      {
        word: '強み',
        reading: 'つよみ',
        meaning: { en: 'strength / advantage', vi: 'điểm mạnh', zh: '优势', my: 'အားသာချက်', ne: 'बलियो पक्ष' },
      },
    ],
    duration: 22,
  },
  {
    id: 'lesson-023',
    title: 'テクノロジーと社会',
    level: 'N2',
    category: '社会',
    audioUrl: '/audio/N2/lesson-023.wav',
    script: {
      japanese: 'テクノロジーの はったつによって、わたしたちの せいかつは おおきく かわりました。スマートフォンの ふきゅうで、いつでも どこでも じょうほうを えられるように なりました。いっぽうで、SNSの つかいすぎが もんだいに なっている めんも あります。べんりさを きょうじゅしながらも、テクノロジーとの つきあいかたを かんがえていく ひつようが あると おもいます。だいじなのは、どうぐに つかわれるのではなく、じぶんで つかいこなすことでは ないでしょうか。',
      japanesePlain: 'てくのろじーのはったつによってわたしたちのせいかつはおおきくかわりましたすまーとふぉんのふきゅうでいつでもどこでもじょうほうをえられるようになりましたいっぽうでえすえぬえすのつかいすぎがもんだいになっているめんもありますべんりさをきょうじゅしながらもてくのろじーとのつきあいかたをかんがえていくひつようがあるとおもいますだいじなのはどうぐにつかわれるのではなくじぶんでつかいこなすことではないでしょうか',
      japaneseKanji: 'テクノロジーの発達によって、私たちの生活は大きく変わりました。スマートフォンの普及で、いつでもどこでも情報を得られるようになりました。一方で、SNSの使いすぎが問題になっている面もあります。便利さを享受しながらも、テクノロジーとの付き合い方を考えていく必要があると思います。大事なのは、道具に使われるのではなく、自分で使いこなすことではないでしょうか。',
    },
    translations: {
      en: 'Our lives have changed significantly due to the advancement of technology. With the spread of smartphones, we can now access information anytime, anywhere. On the other hand, there are also issues with excessive use of social media. While enjoying the convenience, I think we need to consider how we interact with technology. What\'s important is not being controlled by the tool, but mastering it ourselves, isn\'t it?',
      vi: 'Nhờ sự phát triển của công nghệ, cuộc sống của chúng ta đã thay đổi rất nhiều. Với sự phổ biến của điện thoại thông minh, chúng ta có thể tiếp cận thông tin mọi lúc mọi nơi. Mặt khác, việc sử dụng quá nhiều mạng xã hội cũng đang trở thành vấn đề. Trong khi tận hưởng sự tiện lợi, tôi nghĩ chúng ta cần suy nghĩ về cách tương tác với công nghệ. Điều quan trọng không phải bị công cụ chi phối, mà là tự mình làm chủ nó, phải không?',
      zh: '由于科技的发展，我们的生活发生了很大变化。随着智能手机的普及，我们可以随时随地获取信息。另一方面，社交媒体的过度使用也成为问题。在享受便利的同时，我认为我们需要思考如何与科技相处。重要的不是被工具所支配，而是自己去驾驭它，不是吗？',
      my: 'နည်းပညာ တိုးတက်မှုကြောင့် ကျွန်တော်တို့ ဘဝ အများကြီး ပြောင်းလဲခဲ့ပါတယ်။ စမတ်ဖုန်း ပျံ့နှံ့မှုကြောင့် ဘယ်အချိန် ဘယ်နေရာမှာမဆို သတင်းအချက်အလက် ရယူနိုင်ပါပြီ။ တစ်ဖက်မှာတော့ SNS အလွန်အကျွံ သုံးတာလည်း ပြဿနာ ဖြစ်နေပါတယ်။ အဆင်ပြေမှုကို ခံစားရင်းနဲ့ နည်းပညာနဲ့ ဘယ်လို ဆက်ဆံမလဲ စဉ်းစားဖို့ လိုအပ်ပါတယ်။ အရေးကြီးတာက ကိရိယာက ကိုယ့်ကို ထိန်းချုပ်တာ မဟုတ်ဘဲ ကိုယ်တိုင် ကျွမ်းကျင်စွာ သုံးနိုင်ဖို့ပါ။',
      ne: 'प्रविधिको विकासका कारण हाम्रो जीवन धेरै परिवर्तन भएको छ। स्मार्टफोनको प्रसारले जुनसुकै समय जहाँसुकै बाट जानकारी पाउन सकिन्छ। अर्कोतर्फ, सामाजिक सञ्जालको अत्यधिक प्रयोग पनि समस्या बनिरहेको छ। सुविधा उपभोग गर्दागर्दै प्रविधिसँग कसरी व्यवहार गर्ने भनेर सोच्नुपर्छ जस्तो लाग्छ। महत्त्वपूर्ण कुरा औजारले नियन्त्रण गर्नु होइन, आफैँले यसलाई सही प्रयोग गर्नु हो, होइन र?',
    },
    pronunciationTips: {
      ja: [
        '「はったつによって」→ 「によって」は原因・理由を表す',
        '「いっぽうで」→ 対比を示す接続表現',
        '「つかいこなす」→ 複合動詞を一語として発音',
      ],
      en: [
        '"hattatsu ni yotte" - "ni yotte" expresses cause/reason',
        '"ippou de" - Conjunction showing contrast',
        '"tsukaikonasu" - Pronounce this compound verb as one word',
      ],
      vi: [
        '"hattatsu ni yotte" - "ni yotte" diễn đạt nguyên nhân/lý do',
        '"ippou de" - Liên từ thể hiện sự tương phản',
        '"tsukaikonasu" - Phát âm động từ ghép này như một từ',
      ],
      zh: [
        '「はったつによって」→ 「によって」表示原因/理由',
        '「いっぽうで」→ 表示对比的连接表达',
        '「つかいこなす」→ 复合动词作为一个词发音',
      ],
      my: [
        '"hattatsu ni yotte" - "ni yotte" သည် အကြောင်းရင်း/အကြောင်းပြချက်ကို ဖော်ပြသည်',
        '"ippou de" - ဆန့်ကျင်ဘက်ကို ပြသော ဆက်စပ်စကား',
        '"tsukaikonasu" - ပေါင်းစပ်ကြိယာကို စကားလုံးတစ်လုံးအဖြစ် အသံထွက်ပါ',
      ],
      ne: [
        '"hattatsu ni yotte" - "ni yotte" ले कारण/कारण व्यक्त गर्छ',
        '"ippou de" - तुलनात्मक सम्बन्ध जोड्ने अभिव्यक्ति',
        '"tsukaikonasu" - समस्त क्रिया एउटा शब्दको रूपमा उच्चारण गर्नुहोस्',
      ],
    },
    keywords: [
      {
        word: '発達',
        reading: 'はったつ',
        meaning: { en: 'development / advancement', vi: 'phát triển', zh: '发展', my: 'တိုးတက်မှု', ne: 'विकास' },
      },
      {
        word: '普及',
        reading: 'ふきゅう',
        meaning: { en: 'spread / popularization', vi: 'phổ biến', zh: '普及', my: 'ပျံ့နှံ့မှု', ne: 'प्रसार' },
      },
      {
        word: '享受',
        reading: 'きょうじゅ',
        meaning: { en: 'to enjoy (benefits)', vi: 'tận hưởng', zh: '享受', my: 'ခံစားခြင်း', ne: 'उपभोग गर्नु' },
      },
    ],
    duration: 22,
  },
  {
    id: 'lesson-024',
    title: '日本での留学生活を振り返って',
    level: 'N2',
    category: '学校',
    audioUrl: '/audio/N2/lesson-024.wav',
    script: {
      japanese: 'にほんに りゅうがくして にねんが たちました。ふりかえってみると、くろうも おおかったですが、それいじょうに えたものが おおきかったと かんじています。にほんごの のうりょくは もちろん、いぶんかを りかいするちからや、こまったときに じぶんで かいけつするちからも みにつきました。くにでは たいけんできなかったことを たくさん けいけんし、じんせいかんが おおきく かわりました。このけいけんを いかして、しょうらいは にほんと ぼこくの かけはしに なりたいと おもっています。',
      japanesePlain: 'にほんにりゅうがくしてにねんがたちましたふりかえってみるとくろうもおおかったですがそれいじょうにえたものがおおきかったとかんじていますにほんごののうりょくはもちろんいぶんかをりかいするちからやこまったときにじぶんでかいけつするちからもみにつきましたくにではたいけんできなかったことをたくさんけいけんしじんせいかんがおおきくかわりましたこのけいけんをいかしてしょうらいはにほんとぼこくのかけはしになりたいとおもっています',
      japaneseKanji: '日本に留学して2年が経ちました。振り返ってみると、苦労も多かったですが、それ以上に得たものが大きかったと感じています。日本語の能力はもちろん、異文化を理解する力や、困った時に自分で解決する力も身につきました。国では体験できなかったことをたくさん経験し、人生観が大きく変わりました。この経験を活かして、将来は日本と母国の架け橋になりたいと思っています。',
    },
    translations: {
      en: 'It\'s been two years since I started studying abroad in Japan. Looking back, there were many hardships, but I feel that what I gained was even greater. Not only my Japanese ability, but also the ability to understand different cultures and solve problems on my own. I experienced many things I couldn\'t have in my home country, and my outlook on life changed greatly. I want to use this experience and become a bridge between Japan and my home country in the future.',
      vi: 'Đã hai năm kể từ khi tôi du học ở Nhật. Nhìn lại, tuy có nhiều khó khăn, nhưng tôi cảm thấy những gì thu được còn lớn hơn. Không chỉ năng lực tiếng Nhật, mà còn khả năng hiểu văn hóa khác và tự giải quyết vấn đề. Tôi đã trải nghiệm nhiều điều không thể có ở quê nhà, và quan điểm sống đã thay đổi rất nhiều. Tôi muốn tận dụng kinh nghiệm này và trở thành cầu nối giữa Nhật Bản và quê hương trong tương lai.',
      zh: '来日本留学已经两年了。回想起来，虽然有很多辛苦，但我觉得收获更大。不仅是日语能力，还有理解异文化的能力和自己解决问题的能力。在国内无法体验的事情在这里经历了很多，人生观也发生了很大变化。我想利用这段经历，将来成为日本和祖国之间的桥梁。',
      my: 'ဂျပန်မှာ ပညာသင်လာတာ ၂ နှစ်ရှိပြီ။ ပြန်ကြည့်ရင် ခက်ခဲမှုတွေ အများကြီးရှိပေမယ့် ရရှိတာတွေက ပိုကြီးတယ်လို့ ခံစားရပါတယ်။ ဂျပန်စာ စွမ်းရည်သာမက ယဉ်ကျေးမှု ကွဲပြားမှုကို နားလည်တဲ့ စွမ်းရည်နဲ့ ကိုယ်တိုင် ပြဿနာ ဖြေရှင်းနိုင်တဲ့ စွမ်းရည်လည်း ရခဲ့ပါတယ်။ မိခင်နိုင်ငံမှာ မရနိုင်တဲ့ အတွေ့အကြုံတွေ အများကြီး ရခဲ့ပြီး ဘဝအမြင် အများကြီး ပြောင်းလဲခဲ့ပါတယ်။ ဒီအတွေ့အကြုံကို အသုံးချပြီး အနာဂတ်မှာ ဂျပန်နဲ့ မိခင်နိုင်ငံကြား တံတားဖြစ်ချင်ပါတယ်။',
      ne: 'जापानमा पढ्न आएको २ वर्ष भयो। फर्केर हेर्दा कठिनाइहरू धेरै थिए, तर पाएको कुरा झन् ठूलो थियो भन्ने लाग्छ। जापानी भाषाको क्षमता मात्र होइन, विभिन्न संस्कृति बुझ्ने र समस्या आफैँ समाधान गर्ने क्षमता पनि सिकेँ। देशमा अनुभव गर्न नसक्ने कुराहरू यहाँ धेरै अनुभव गरेँ र जीवनको दृष्टिकोण धेरै बदलियो। यो अनुभव प्रयोग गरेर भविष्यमा जापान र मातृभूमिबीचको पुल बन्न चाहन्छु।',
    },
    pronunciationTips: {
      ja: [
        '「ふりかえってみると」→ 回想の表現を自然に',
        '「みにつきました」→ 「身につく」を一語として',
        '「かけはし」→ 比喩表現を感情込めて',
      ],
      en: [
        '"furikaette miru to" - Say the retrospective expression naturally',
        '"mi ni tsukimashita" - Pronounce "mi ni tsuku" as one phrase',
        '"kakehashi" - Say this metaphor with feeling',
      ],
      vi: [
        '"furikaette miru to" - Nói biểu đạt hồi tưởng một cách tự nhiên',
        '"mi ni tsukimashita" - Phát âm "mi ni tsuku" như một cụm từ',
        '"kakehashi" - Nói phép ẩn dụ này với cảm xúc',
      ],
      zh: [
        '「ふりかえってみると」→ 回想的表达要自然',
        '「みにつきました」→ 「身につく」作为一个词',
        '「かけはし」→ 比喻表达要带有感情',
      ],
      my: [
        '"furikaette miru to" - ပြန်တွေးခြင်း အသံထွက်ကို သဘာဝကျကျ ပြောပါ',
        '"mi ni tsukimashita" - "mi ni tsuku" ကို စကားစုတစ်ခုအဖြစ် အသံထွက်ပါ',
        '"kakehashi" - ဤဥပမာကို စိတ်ခံစားချက်ထည့်ပြီး ပြောပါ',
      ],
      ne: [
        '"furikaette miru to" - स्मरणको अभिव्यक्ति प्राकृतिक रूपमा भन्नुहोस्',
        '"mi ni tsukimashita" - "mi ni tsuku" एउटा वाक्यांशको रूपमा उच्चारण गर्नुहोस्',
        '"kakehashi" - यो रूपक भावनासहित भन्नुहोस्',
      ],
    },
    keywords: [
      {
        word: '留学',
        reading: 'りゅうがく',
        meaning: { en: 'studying abroad', vi: 'du học', zh: '留学', my: 'ပြည်ပပညာသင်', ne: 'विदेशमा अध्ययन' },
      },
      {
        word: '異文化',
        reading: 'いぶんか',
        meaning: { en: 'different culture', vi: 'văn hóa khác', zh: '异文化', my: 'ယဉ်ကျေးမှုကွဲပြားမှု', ne: 'विभिन्न संस्कृति' },
      },
      {
        word: '架け橋',
        reading: 'かけはし',
        meaning: { en: 'bridge (figurative)', vi: 'cầu nối', zh: '桥梁（比喻）', my: 'တံတား (ဥပမာ)', ne: 'पुल (रूपक)' },
      },
    ],
    duration: 25,
  },
  {
    id: 'lesson-025',
    title: '日本の働き方改革',
    level: 'N2',
    category: '社会',
    audioUrl: '/audio/N2/lesson-025.wav',
    script: {
      japanese: 'にほんでは「はたらきかたかいかく」が すすめられています。いぜんは ながいじかん はたらくことが びとくと される ふうちょうが ありましたが、さいきんでは ワークライフバランスの じゅうようせいが にんしきされるように なってきました。リモートワークや フレックスタイムの どうにゅうにより、はたらきかたの せんたくしが ひろがっています。しかし、せいどが あっても、じっさいに りようしやすい かんきょうが ととのっているかどうかが かだいです。だれもが じぶんらしく はたらける しゃかいの じつげんに むけて、さらなる とりくみが ひつようです。',
      japanesePlain: 'にほんではたらきかたかいかくがすすめられていますいぜんはながいじかんはたらくことがびとくとされるふうちょうがありましたがさいきんではわーくらいふばらんすのじゅうようせいがにんしきされるようになってきましたりもーとわーくやふれっくすたいむのどうにゅうによりはたらきかたのせんたくしがひろがっていますしかしせいどがあってもじっさいにりようしやすいかんきょうがととのっているかどうかがかだいですだれもがじぶんらしくはたらけるしゃかいのじつげんにむけてさらなるとりくみがひつようです',
      japaneseKanji: '日本では「働き方改革」が進められています。以前は長い時間働くことが美徳とされる風潮がありましたが、最近ではワークライフバランスの重要性が認識されるようになってきました。リモートワークやフレックスタイムの導入により、働き方の選択肢が広がっています。しかし、制度があっても、実際に利用しやすい環境が整っているかどうかが課題です。誰もが自分らしく働ける社会の実現に向けて、さらなる取り組みが必要です。',
    },
    translations: {
      en: 'In Japan, "work style reform" is being promoted. Previously, there was a tendency to consider long working hours as a virtue, but recently the importance of work-life balance has come to be recognized. With the introduction of remote work and flextime, options for how to work have expanded. However, even if systems exist, whether the environment makes them easy to actually use remains a challenge. Further efforts are needed toward realizing a society where everyone can work in their own way.',
      vi: 'Ở Nhật Bản, "cải cách phong cách làm việc" đang được thúc đẩy. Trước đây có xu hướng coi làm việc nhiều giờ là đức tính tốt, nhưng gần đây tầm quan trọng của cân bằng công việc-cuộc sống đã được nhận thức. Với việc áp dụng làm việc từ xa và giờ linh hoạt, các lựa chọn về cách làm việc đã mở rộng. Tuy nhiên, dù có chế độ nhưng liệu môi trường có dễ sử dụng hay không vẫn là thách thức. Cần nỗ lực hơn nữa để thực hiện một xã hội mà ai cũng có thể làm việc theo cách của mình.',
      zh: '在日本，"工作方式改革"正在推进。以前有一种把长时间工作视为美德的风潮，但最近人们认识到了工作与生活平衡的重要性。通过引入远程办公和弹性工作制，工作方式的选择增多了。但是，即使有制度，实际使用环境是否完善仍是课题。为了实现每个人都能按自己的方式工作的社会，还需要进一步努力。',
      my: 'ဂျပန်မှာ "အလုပ်လုပ်ပုံ ပြုပြင်ပြောင်းလဲရေး" ကို အားပေးနေပါတယ်။ ယခင်က အချိန်ကြာကြာ အလုပ်လုပ်တာကို ကောင်းမွန်တဲ့ အကျင့်လို့ ယူဆတဲ့ လေ့လာချက်ရှိခဲ့ပေမယ့် မကြာသေးခင်က အလုပ်နဲ့ ဘဝ ဟန်ချက်ညီရေး အရေးပါမှုကို သိရှိလာပါပြီ။ Remote work နဲ့ flextime စနစ်တွေ မိတ်ဆက်ခြင်းဖြင့် အလုပ်လုပ်ပုံ ရွေးချယ်စရာတွေ ကျယ်ပြန့်လာပါတယ်။ သို့ပေမယ့် စနစ်ရှိပေမယ့် တကယ်အသုံးပြုရ လွယ်ကူတဲ့ ပတ်ဝန်းကျင်ရှိမရှိ စိန်ခေါ်မှု ဖြစ်ပါတယ်။ လူတိုင်း ကိုယ့်ဟန်နဲ့ကိုယ် အလုပ်လုပ်နိုင်တဲ့ လူ့အဖွဲ့အစည်း ဖြစ်လာဖို့ ပိုမိုကြိုးစားဖို့ လိုအပ်ပါတယ်။',
      ne: 'जापानमा "कार्यशैली सुधार" अगाडि बढाइरहेको छ। पहिले लामो समय काम गर्नु सद्गुण मानिन्थ्यो, तर हालै कार्य-जीवन सन्तुलनको महत्त्व बुझिन थालेको छ। दूरस्थ कार्य र लचिलो समयको प्रवेशले काम गर्ने विकल्पहरू बढेका छन्। तर, प्रणाली भए पनि वास्तवमा प्रयोग गर्न सजिलो वातावरण तयार भएको छ कि छैन भन्ने चुनौती छ। सबैले आफ्नो तरिकाले काम गर्न सक्ने समाज साकार पार्न थप प्रयास आवश्यक छ।',
    },
    pronunciationTips: {
      ja: [
        '「はたらきかたかいかく」→ 複合語を区切りすぎない',
        '「にんしきされるように」→ 受身+変化の表現',
        '「じつげんにむけて」→ 「向けて」で目標を示す',
      ],
      en: [
        '"hatarakikata kaikaku" - Don\'t break up the compound word too much',
        '"ninshiki sareru you ni" - Passive + change expression',
        '"jitsugen ni mukete" - "mukete" shows the goal',
      ],
      vi: [
        '"hatarakikata kaikaku" - Không ngắt quãng từ ghép quá nhiều',
        '"ninshiki sareru you ni" - Thể bị động + biểu đạt sự thay đổi',
        '"jitsugen ni mukete" - "mukete" chỉ mục tiêu',
      ],
      zh: [
        '「はたらきかたかいかく」→ 复合词不要断开太多',
        '「にんしきされるように」→ 被动+变化的表达',
        '「じつげんにむけて」→ 「向けて」表示目标',
      ],
      my: [
        '"hatarakikata kaikaku" - ပေါင်းစပ်စကားကို အလွန်အကျွံ မဖြတ်ပါနဲ့',
        '"ninshiki sareru you ni" - passive + ပြောင်းလဲမှု အသံထွက်',
        '"jitsugen ni mukete" - "mukete" သည် ပန်းတိုင်ကို ဖော်ပြသည်',
      ],
      ne: [
        '"hatarakikata kaikaku" - समस्त शब्दलाई धेरै नतोड्नुहोस्',
        '"ninshiki sareru you ni" - कर्मवाच्य + परिवर्तनको अभिव्यक्ति',
        '"jitsugen ni mukete" - "mukete" ले लक्ष्य जनाउँछ',
      ],
    },
    keywords: [
      {
        word: '働き方改革',
        reading: 'はたらきかたかいかく',
        meaning: { en: 'work style reform', vi: 'cải cách phong cách làm việc', zh: '工作方式改革', my: 'အလုပ်လုပ်ပုံ ပြုပြင်ပြောင်းလဲရေး', ne: 'कार्यशैली सुधार' },
      },
      {
        word: '風潮',
        reading: 'ふうちょう',
        meaning: { en: 'trend / tendency', vi: 'xu hướng', zh: '风潮', my: 'လမ်းကြောင်း', ne: 'प्रवृत्ति' },
      },
      {
        word: '実現',
        reading: 'じつげん',
        meaning: { en: 'realization', vi: 'thực hiện', zh: '实现', my: 'အကောင်အထည်ဖော်ခြင်း', ne: 'साकार पार्नु' },
      },
    ],
    duration: 25,
  },
];

/**
 * カテゴリー別にレッスンを取得
 */
export const getLessonsByCategory = (category: NonNullable<Lesson['category']>): Lesson[] => {
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
 * カテゴリー一覧を取得（undefinedを除外）
 */
export const getCategories = (): NonNullable<Lesson['category']>[] => {
  const categories = lessons
    .map((lesson) => lesson.category)
    .filter((c): c is NonNullable<Lesson['category']> => c !== undefined);
  return Array.from(new Set(categories));
};

/**
 * レベル一覧を取得
 */
export const getLevels = (): Lesson['level'][] => {
  return Array.from(new Set(lessons.map((lesson) => lesson.level)));
};
