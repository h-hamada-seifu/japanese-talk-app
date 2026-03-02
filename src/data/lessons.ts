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
      vi: '(翻訳準備中)',
      zh: '(翻訳準備中)',
      my: '(翻訳準備中)',
      ne: '(翻訳準備中)',
    },
    pronunciationTips: {
      ja: [
        '「あいませんか」→ 語尾を上げて誘いの気持ちを出す',
        '「いきたいんですが」→ 「んです」で理由を伝える',
        '「れんらく」→ 「ん」をしっかり2回発音',
      ],
      en: [],
      vi: [],
      zh: [],
      my: [],
      ne: [],
    },
    keywords: [
      {
        word: '駅前',
        reading: 'えきまえ',
        meaning: { en: 'in front of the station', vi: '(準備中)', zh: '(准备中)', my: '(準備中)', ne: '(準備中)' },
      },
      {
        word: '連絡',
        reading: 'れんらく',
        meaning: { en: 'contact', vi: '(準備中)', zh: '(准备中)', my: '(準備中)', ne: '(準備中)' },
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
      vi: '(翻訳準備中)',
      zh: '(翻訳準備中)',
      my: '(翻訳準備中)',
      ne: '(翻訳準備中)',
    },
    pronunciationTips: {
      ja: [
        '「ゆうびんきょく」→ 「きょ」は口を丸めて',
        '「まっすぐ」→ 「っ」の前で一瞬止まる',
        '「ひだりがわ」→ 5拍で均等に',
      ],
      en: [],
      vi: [],
      zh: [],
      my: [],
      ne: [],
    },
    keywords: [
      {
        word: '郵便局',
        reading: 'ゆうびんきょく',
        meaning: { en: 'post office', vi: '(準備中)', zh: '(准备中)', my: '(準備中)', ne: '(準備中)' },
      },
      {
        word: '信号',
        reading: 'しんごう',
        meaning: { en: 'traffic light', vi: '(準備中)', zh: '(准备中)', my: '(準備中)', ne: '(準備中)' },
      },
      {
        word: '曲がる',
        reading: 'まがる',
        meaning: { en: 'to turn', vi: '(準備中)', zh: '(准备中)', my: '(準備中)', ne: '(準備中)' },
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
      vi: '(翻訳準備中)',
      zh: '(翻訳準備中)',
      my: '(翻訳準備中)',
      ne: '(翻訳準備中)',
    },
    pronunciationTips: {
      ja: [
        '「いたくて」→ て形で理由をつなげる表現',
        '「よくなりません」→ 否定の「ません」をはっきり',
        '「どうしたら」→ 「した」にアクセントを置く',
      ],
      en: [],
      vi: [],
      zh: [],
      my: [],
      ne: [],
    },
    keywords: [
      {
        word: '熱',
        reading: 'ねつ',
        meaning: { en: 'fever', vi: '(準備中)', zh: '(准备中)', my: '(準備中)', ne: '(準備中)' },
      },
      {
        word: '薬',
        reading: 'くすり',
        meaning: { en: 'medicine', vi: '(準備中)', zh: '(准备中)', my: '(準備中)', ne: '(準備中)' },
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
      vi: '(翻訳準備中)',
      zh: '(翻訳準備中)',
      my: '(翻訳準備中)',
      ne: '(翻訳準備中)',
    },
    pronunciationTips: {
      ja: [
        '「おわってから」→ 「って」で強く、「から」で理由を示す',
        '「じょうず」→ 「じょ」は口を丸めて',
        '「がんばります」→ 最後まではっきり言い切る',
      ],
      en: [],
      vi: [],
      zh: [],
      my: [],
      ne: [],
    },
    keywords: [
      {
        word: '働く',
        reading: 'はたらく',
        meaning: { en: 'to work', vi: '(準備中)', zh: '(准备中)', my: '(準備中)', ne: '(準備中)' },
      },
      {
        word: '頑張る',
        reading: 'がんばる',
        meaning: { en: 'to do one\'s best', vi: '(準備中)', zh: '(准备中)', my: '(準備中)', ne: '(準備中)' },
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
      vi: '(翻訳準備中)',
      zh: '(翻訳準備中)',
      my: '(翻訳準備中)',
      ne: '(翻訳準備中)',
    },
    pronunciationTips: {
      ja: [
        '「しんじゅく」→ 「ん」と「じゅ」をはっきり区別',
        '「おのりかえ」→ 丁寧語の「お」を忘れない',
        '「ごちゅうい」→ 「ちゅう」は口を丸めて',
      ],
      en: [],
      vi: [],
      zh: [],
      my: [],
      ne: [],
    },
    keywords: [
      {
        word: '乗り換え',
        reading: 'のりかえ',
        meaning: { en: 'transfer (train)', vi: '(準備中)', zh: '(准备中)', my: '(準備中)', ne: '(準備中)' },
      },
      {
        word: '忘れ物',
        reading: 'わすれもの',
        meaning: { en: 'lost item / forgotten belongings', vi: '(準備中)', zh: '(准备中)', my: '(準備中)', ne: '(準備中)' },
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
      vi: '(翻訳準備中)',
      zh: '(翻訳準備中)',
      my: '(翻訳準備中)',
      ne: '(翻訳準備中)',
    },
    pronunciationTips: {
      ja: [
        '「だそうです」→ 伝聞の「そう」を自然に',
        '「すすめられて」→ 受身形の「られて」をなめらかに',
        '「にはくみっか」→ 「っ」で一瞬止まる',
      ],
      en: [],
      vi: [],
      zh: [],
      my: [],
      ne: [],
    },
    keywords: [
      {
        word: '紅葉',
        reading: 'こうよう',
        meaning: { en: 'autumn leaves', vi: '(準備中)', zh: '(准备中)', my: '(準備中)', ne: '(準備中)' },
      },
      {
        word: '旅館',
        reading: 'りょかん',
        meaning: { en: 'Japanese inn', vi: '(準備中)', zh: '(准备中)', my: '(準備中)', ne: '(準備中)' },
      },
      {
        word: '予定',
        reading: 'よてい',
        meaning: { en: 'plan / schedule', vi: '(準備中)', zh: '(准备中)', my: '(準備中)', ne: '(準備中)' },
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
      vi: '(翻訳準備中)',
      zh: '(翻訳準備中)',
      my: '(翻訳準備中)',
      ne: '(翻訳準備中)',
    },
    pronunciationTips: {
      ja: [
        '「あるんですが」→ 「んです」で切り出しの柔らかさ',
        '「ついていけなくなっています」→ 長い動詞を区切って練習',
        '「いただけませんか」→ 丁寧な依頼表現、語尾を上げる',
      ],
      en: [],
      vi: [],
      zh: [],
      my: [],
      ne: [],
    },
    keywords: [
      {
        word: '相談',
        reading: 'そうだん',
        meaning: { en: 'consultation', vi: '(準備中)', zh: '(准备中)', my: '(準備中)', ne: '(準備中)' },
      },
      {
        word: '授業',
        reading: 'じゅぎょう',
        meaning: { en: 'class / lesson', vi: '(準備中)', zh: '(准备中)', my: '(準備中)', ne: '(準備中)' },
      },
      {
        word: '方法',
        reading: 'ほうほう',
        meaning: { en: 'method', vi: '(準備中)', zh: '(准备中)', my: '(準備中)', ne: '(準備中)' },
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
      vi: '(翻訳準備中)',
      zh: '(翻訳準備中)',
      my: '(翻訳準備中)',
      ne: '(翻訳準備中)',
    },
    pronunciationTips: {
      ja: [
        '「いただきたいんですが」→ 丁寧な希望表現',
        '「いただけると たすかります」→ 依頼の定型表現を覚える',
        '「ごめいわくを おかけします」→ ビジネス定型、なめらかに',
      ],
      en: [],
      vi: [],
      zh: [],
      my: [],
      ne: [],
    },
    keywords: [
      {
        word: '行事',
        reading: 'ぎょうじ',
        meaning: { en: 'event', vi: '(準備中)', zh: '(准备中)', my: '(準備中)', ne: '(準備中)' },
      },
      {
        word: '迷惑',
        reading: 'めいわく',
        meaning: { en: 'inconvenience / trouble', vi: '(準備中)', zh: '(准备中)', my: '(準備中)', ne: '(準備中)' },
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
      vi: '(翻訳準備中)',
      zh: '(翻訳準備中)',
      my: '(翻訳準備中)',
      ne: '(翻訳準備中)',
    },
    pronunciationTips: {
      ja: [
        '「しき」→ 「し」と「き」を明確に分ける',
        '「はなびたいかい」→ 「たいかい」の「い」を伸ばす',
        '「きもちいい」→ 「もち」にアクセント',
      ],
      en: [],
      vi: [],
      zh: [],
      my: [],
      ne: [],
    },
    keywords: [
      {
        word: '四季',
        reading: 'しき',
        meaning: { en: 'four seasons', vi: '(準備中)', zh: '(准备中)', my: '(準備中)', ne: '(準備中)' },
      },
      {
        word: '花火大会',
        reading: 'はなびたいかい',
        meaning: { en: 'fireworks festival', vi: '(準備中)', zh: '(准备中)', my: '(準備中)', ne: '(準備中)' },
      },
      {
        word: '温泉',
        reading: 'おんせん',
        meaning: { en: 'hot spring', vi: '(準備中)', zh: '(准备中)', my: '(準備中)', ne: '(準備中)' },
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
      vi: '(翻訳準備中)',
      zh: '(翻訳準備中)',
      my: '(翻訳準備中)',
      ne: '(翻訳準備中)',
    },
    pronunciationTips: {
      ja: [
        '「つうじなくて」→ 「つう」を伸ばして「じ」をはっきり',
        '「わかるように なってきました」→ 変化の表現を自然に',
        '「きをつけて」→ 「き」にアクセント',
      ],
      en: [],
      vi: [],
      zh: [],
      my: [],
      ne: [],
    },
    keywords: [
      {
        word: '半年',
        reading: 'はんとし',
        meaning: { en: 'half a year', vi: '(準備中)', zh: '(准备中)', my: '(準備中)', ne: '(準備中)' },
      },
      {
        word: '通じる',
        reading: 'つうじる',
        meaning: { en: 'to be understood / communicate', vi: '(準備中)', zh: '(准备中)', my: '(準備中)', ne: '(準備中)' },
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
      vi: '(翻訳準備中)',
      zh: '(翻訳準備中)',
      my: '(翻訳準備中)',
      ne: '(翻訳準備中)',
    },
    pronunciationTips: {
      ja: [
        '「かんきょうもんだい」→ 複合語を途切れずに',
        '「いわれています」→ 受身+進行の自然な発音',
        '「ないでしょうか」→ 提案の語尾を柔らかく',
      ],
      en: [],
      vi: [],
      zh: [],
      my: [],
      ne: [],
    },
    keywords: [
      {
        word: '環境問題',
        reading: 'かんきょうもんだい',
        meaning: { en: 'environmental issues', vi: '(準備中)', zh: '(准备中)', my: '(準備中)', ne: '(準備中)' },
      },
      {
        word: '地球温暖化',
        reading: 'ちきゅうおんだんか',
        meaning: { en: 'global warming', vi: '(準備中)', zh: '(准备中)', my: '(準備中)', ne: '(準備中)' },
      },
      {
        word: '異常気象',
        reading: 'いじょうきしょう',
        meaning: { en: 'extreme weather', vi: '(準備中)', zh: '(准备中)', my: '(準備中)', ne: '(準備中)' },
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
      vi: '(翻訳準備中)',
      zh: '(翻訳準備中)',
      my: '(翻訳準備中)',
      ne: '(翻訳準備中)',
    },
    pronunciationTips: {
      ja: [
        '「しゅうしょくかつどう」→ 長い複合語を一息で',
        '「〜たり〜たりするうちに」→ 列挙の表現をリズムよく',
        '「あきらめずに」→ 「ず」は「す」に近い発音',
      ],
      en: [],
      vi: [],
      zh: [],
      my: [],
      ne: [],
    },
    keywords: [
      {
        word: '就職活動',
        reading: 'しゅうしょくかつどう',
        meaning: { en: 'job hunting', vi: '(準備中)', zh: '(准备中)', my: '(準備中)', ne: '(準備中)' },
      },
      {
        word: '内定',
        reading: 'ないてい',
        meaning: { en: 'job offer', vi: '(準備中)', zh: '(准备中)', my: '(準備中)', ne: '(準備中)' },
      },
      {
        word: '強み',
        reading: 'つよみ',
        meaning: { en: 'strength / advantage', vi: '(準備中)', zh: '(准备中)', my: '(準備中)', ne: '(準備中)' },
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
      vi: '(翻訳準備中)',
      zh: '(翻訳準備中)',
      my: '(翻訳準備中)',
      ne: '(翻訳準備中)',
    },
    pronunciationTips: {
      ja: [
        '「はったつによって」→ 「によって」は原因・理由を表す',
        '「いっぽうで」→ 対比を示す接続表現',
        '「つかいこなす」→ 複合動詞を一語として発音',
      ],
      en: [],
      vi: [],
      zh: [],
      my: [],
      ne: [],
    },
    keywords: [
      {
        word: '発達',
        reading: 'はったつ',
        meaning: { en: 'development / advancement', vi: '(準備中)', zh: '(准备中)', my: '(準備中)', ne: '(準備中)' },
      },
      {
        word: '普及',
        reading: 'ふきゅう',
        meaning: { en: 'spread / popularization', vi: '(準備中)', zh: '(准备中)', my: '(準備中)', ne: '(準備中)' },
      },
      {
        word: '享受',
        reading: 'きょうじゅ',
        meaning: { en: 'to enjoy (benefits)', vi: '(準備中)', zh: '(准备中)', my: '(準備中)', ne: '(準備中)' },
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
      vi: '(翻訳準備中)',
      zh: '(翻訳準備中)',
      my: '(翻訳準備中)',
      ne: '(翻訳準備中)',
    },
    pronunciationTips: {
      ja: [
        '「ふりかえってみると」→ 回想の表現を自然に',
        '「みにつきました」→ 「身につく」を一語として',
        '「かけはし」→ 比喩表現を感情込めて',
      ],
      en: [],
      vi: [],
      zh: [],
      my: [],
      ne: [],
    },
    keywords: [
      {
        word: '留学',
        reading: 'りゅうがく',
        meaning: { en: 'studying abroad', vi: '(準備中)', zh: '(准备中)', my: '(準備中)', ne: '(準備中)' },
      },
      {
        word: '異文化',
        reading: 'いぶんか',
        meaning: { en: 'different culture', vi: '(準備中)', zh: '(准备中)', my: '(準備中)', ne: '(準備中)' },
      },
      {
        word: '架け橋',
        reading: 'かけはし',
        meaning: { en: 'bridge (figurative)', vi: '(準備中)', zh: '(准备中)', my: '(準備中)', ne: '(準備中)' },
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
      vi: '(翻訳準備中)',
      zh: '(翻訳準備中)',
      my: '(翻訳準備中)',
      ne: '(翻訳準備中)',
    },
    pronunciationTips: {
      ja: [
        '「はたらきかたかいかく」→ 複合語を区切りすぎない',
        '「にんしきされるように」→ 受身+変化の表現',
        '「じつげんにむけて」→ 「向けて」で目標を示す',
      ],
      en: [],
      vi: [],
      zh: [],
      my: [],
      ne: [],
    },
    keywords: [
      {
        word: '働き方改革',
        reading: 'はたらきかたかいかく',
        meaning: { en: 'work style reform', vi: '(準備中)', zh: '(准备中)', my: '(準備中)', ne: '(準備中)' },
      },
      {
        word: '風潮',
        reading: 'ふうちょう',
        meaning: { en: 'trend / tendency', vi: '(準備中)', zh: '(准备中)', my: '(準備中)', ne: '(準備中)' },
      },
      {
        word: '実現',
        reading: 'じつげん',
        meaning: { en: 'realization', vi: '(準備中)', zh: '(准备中)', my: '(準備中)', ne: '(準備中)' },
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
