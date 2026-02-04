/**
 * レッスンデータ定義
 * 日本語リスニング・発音練習用の音声素材
 */

export interface Lesson {
  id: string;
  title: string;
  level: 'N5' | 'N4';
  category: '挨拶' | '日常' | '買い物' | '食事' | '交通';
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
  };
  pronunciationTips: {
    ja: string[];
    en: string[];
    vi: string[];
    zh: string[];
  };
  keywords: {
    word: string;
    reading: string;
    meaning: {
      en: string;
      vi: string;
      zh: string;
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
    title: '朝の挨拶',
    level: 'N5',
    category: '挨拶',
    audioUrl: '/audio/lesson-001.mp3',
    script: {
      japanese: 'おはようございます。きょうも いいてんきですね。',
      japanesePlain: 'おはようございますきょうもいいてんきですね',
      japaneseKanji: 'おはようございます。今日もいい天気ですね。',
    },
    translations: {
      en: 'Good morning. It\'s nice weather today too, isn\'t it?',
      vi: 'Chào buổi sáng. Hôm nay thời tiết cũng đẹp nhỉ.',
      zh: '早上好。今天天气也很好呢。',
    },
    pronunciationTips: {
      ja: [
        '「おはようございます」→ 「おはよー」と伸ばさない',
        '「いいてんき」→ 「い」を2回はっきり言う',
        '「ですね」→ 語尾を少し上げる',
      ],
      en: [
        '"Ohayou gozaimasu" - Don\'t stretch "ohayo" too long',
        '"ii tenki" - Pronounce both "i" sounds clearly',
        '"desu ne" - Slightly raise your tone at the end',
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
    },
    keywords: [
      {
        word: 'おはようございます',
        reading: 'おはようございます',
        meaning: { en: 'Good morning (polite)', vi: 'Chào buổi sáng (lịch sự)', zh: '早上好（礼貌）' },
      },
      {
        word: '天気',
        reading: 'てんき',
        meaning: { en: 'weather', vi: 'thời tiết', zh: '天气' },
      },
    ],
    duration: 4,
  },
  {
    id: 'lesson-002',
    title: '自己紹介',
    level: 'N5',
    category: '挨拶',
    audioUrl: '/audio/lesson-002.mp3',
    script: {
      japanese: 'はじめまして。わたしは リンです。ベトナムから きました。どうぞ よろしく おねがいします。',
      japanesePlain: 'はじめましてわたしはりんですべとなむからきましたどうぞよろしくおねがいします',
      japaneseKanji: '初めまして。私はリンです。ベトナムから来ました。どうぞよろしくお願いします。',
    },
    translations: {
      en: 'Nice to meet you. I\'m Lin. I came from Vietnam. Please take care of me.',
      vi: 'Rất vui được gặp bạn. Tôi là Linh. Tôi đến từ Việt Nam. Rất mong được giúp đỡ.',
      zh: '初次见面。我是林。我来自越南。请多关照。',
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
        '"Yoroshiku onegaishimasu" - Say slowly and politely',
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
    },
    keywords: [
      {
        word: '初めまして',
        reading: 'はじめまして',
        meaning: { en: 'Nice to meet you', vi: 'Rất vui được gặp bạn', zh: '初次见面' },
      },
      {
        word: '来ました',
        reading: 'きました',
        meaning: { en: 'came (from)', vi: 'đến từ', zh: '来自' },
      },
    ],
    duration: 7,
  },
  {
    id: 'lesson-003',
    title: 'お礼を言う',
    level: 'N5',
    category: '挨拶',
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
    },
    keywords: [
      {
        word: '助けて',
        reading: 'たすけて',
        meaning: { en: 'help (te-form)', vi: 'giúp đỡ', zh: '帮助' },
      },
      {
        word: '助かりました',
        reading: 'たすかりました',
        meaning: { en: 'was saved/helped', vi: 'được cứu giúp', zh: '得救了' },
      },
    ],
    duration: 6,
  },

  // ============================================
  // カテゴリー: 日常（3レッスン）
  // ============================================
  {
    id: 'lesson-004',
    title: '週末の予定',
    level: 'N5',
    category: '日常',
    audioUrl: '/audio/lesson-004.mp3',
    script: {
      japanese: 'こんしゅうまつは ともだちと えいがを みに いきます。たのしみです。',
      japanesePlain: 'こんしゅうまつはともだちとえいがをみにいきますたのしみです',
      japaneseKanji: '今週末は友達と映画を見に行きます。楽しみです。',
    },
    translations: {
      en: 'This weekend, I\'m going to see a movie with my friend. I\'m looking forward to it.',
      vi: 'Cuối tuần này, tôi sẽ đi xem phim với bạn. Tôi rất mong chờ.',
      zh: '这个周末我要和朋友去看电影。很期待。',
    },
    pronunciationTips: {
      ja: [
        '「えいが」→ 「え」は口を横に広げる',
        '「みにいきます」→ 「に」と「い」をつなげすぎない',
        '「たのしみ」→ 「の」を強調しない',
      ],
      en: [
        '"Eiga" - Open your mouth wide for "e"',
        '"Mini ikimasu" - Don\'t blend "ni" and "i" too much',
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
    },
    keywords: [
      {
        word: '週末',
        reading: 'しゅうまつ',
        meaning: { en: 'weekend', vi: 'cuối tuần', zh: '周末' },
      },
      {
        word: '映画',
        reading: 'えいが',
        meaning: { en: 'movie', vi: 'phim', zh: '电影' },
      },
      {
        word: '楽しみ',
        reading: 'たのしみ',
        meaning: { en: 'looking forward to', vi: 'mong chờ', zh: '期待' },
      },
    ],
    duration: 6,
  },
  {
    id: 'lesson-005',
    title: '昨日の出来事',
    level: 'N5',
    category: '日常',
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
    },
    pronunciationTips: {
      ja: [
        '「きのう」→ 「き」を強く言わない',
        '「ともだち」→ はっきりと4拍で',
        '「おもしろかった」→ 「しろ」を強調しない',
      ],
      en: [
        '"Kinou" - Don\'t emphasize "ki" too much',
        '"Tomodachi" - Pronounce clearly in 4 beats',
        '"Omoshirokatta" - Don\'t stress "shiro"',
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
    },
    keywords: [
      {
        word: '昨日',
        reading: 'きのう',
        meaning: { en: 'yesterday', vi: 'hôm qua', zh: '昨天' },
      },
      {
        word: '友達',
        reading: 'ともだち',
        meaning: { en: 'friend', vi: 'bạn bè', zh: '朋友' },
      },
      {
        word: '面白かった',
        reading: 'おもしろかった',
        meaning: { en: 'was interesting', vi: 'thú vị', zh: '有趣' },
      },
    ],
    duration: 5,
  },
  {
    id: 'lesson-006',
    title: '趣味について',
    level: 'N5',
    category: '日常',
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
    },
    pronunciationTips: {
      ja: [
        '「しゅみ」→ 「しゅ」は唇を丸めて',
        '「おんがく」→ 「ん」をしっかり発音',
        '「すき」→ 「す」は軽く',
      ],
      en: [
        '"Shumi" - Round your lips for "shu"',
        '"Ongaku" - Pronounce "n" firmly',
        '"Suki" - Keep "su" light',
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
    },
    keywords: [
      {
        word: '趣味',
        reading: 'しゅみ',
        meaning: { en: 'hobby', vi: 'sở thích', zh: '爱好' },
      },
      {
        word: '音楽',
        reading: 'おんがく',
        meaning: { en: 'music', vi: 'âm nhạc', zh: '音乐' },
      },
      {
        word: '歌',
        reading: 'うた',
        meaning: { en: 'song', vi: 'bài hát', zh: '歌曲' },
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
    category: '買い物',
    audioUrl: '/audio/lesson-007.mp3',
    script: {
      japanese: 'すみません、この おにぎりを ください。あと、おちゃも おねがいします。',
      japanesePlain: 'すみませんこのおにぎりをくださいあとおちゃもおねがいします',
      japaneseKanji: 'すみません、このおにぎりをください。あと、お茶もお願いします。',
    },
    translations: {
      en: 'Excuse me, please give me this rice ball. Also, tea please.',
      vi: 'Xin lỗi, cho tôi cái onigiri này. Và cả trà nữa.',
      zh: '不好意思，请给我这个饭团。还有，请给我茶。',
    },
    pronunciationTips: {
      ja: [
        '「すみません」→ 丁寧に、ゆっくり',
        '「おにぎり」→ 4拍で均等に',
        '「おねがいします」→ 「お」をしっかり',
      ],
      en: [
        '"Sumimasen" - Politely and slowly',
        '"Onigiri" - Evenly in 4 beats',
        '"Onegaishimasu" - Emphasize "o"',
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
    },
    keywords: [
      {
        word: 'おにぎり',
        reading: 'おにぎり',
        meaning: { en: 'rice ball', vi: 'cơm nắm', zh: '饭团' },
      },
      {
        word: 'お茶',
        reading: 'おちゃ',
        meaning: { en: 'tea', vi: 'trà', zh: '茶' },
      },
    ],
    duration: 5,
  },
  {
    id: 'lesson-008',
    title: '値段を聞く',
    level: 'N5',
    category: '買い物',
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
    },
    keywords: [
      {
        word: 'いくら',
        reading: 'いくら',
        meaning: { en: 'how much', vi: 'bao nhiêu', zh: '多少钱' },
      },
    ],
    duration: 3,
  },

  // ============================================
  // カテゴリー: 食事（2レッスン）
  // ============================================
  {
    id: 'lesson-009',
    title: 'レストランで注文',
    level: 'N5',
    category: '食事',
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
    },
    keywords: [
      {
        word: 'ラーメン',
        reading: 'らーめん',
        meaning: { en: 'ramen', vi: 'mì ramen', zh: '拉面' },
      },
      {
        word: '一つ',
        reading: 'ひとつ',
        meaning: { en: 'one (thing)', vi: 'một cái', zh: '一个' },
      },
      {
        word: '餃子',
        reading: 'ぎょうざ',
        meaning: { en: 'gyoza/dumplings', vi: 'há cảo', zh: '饺子' },
      },
    ],
    duration: 5,
  },
  {
    id: 'lesson-010',
    title: '食事の感想',
    level: 'N5',
    category: '食事',
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
    },
    pronunciationTips: {
      ja: [
        '「おいしい」→ 「い」を2回はっきり',
        '「スープ」→ 「ー」を伸ばす',
        '「さいこう」→ 「こう」を伸ばす',
      ],
      en: [
        '"Oishii" - Pronounce both "i" sounds clearly',
        '"Suupu" - Stretch the "uu"',
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
    },
    keywords: [
      {
        word: '美味しい',
        reading: 'おいしい',
        meaning: { en: 'delicious', vi: 'ngon', zh: '好吃' },
      },
      {
        word: 'スープ',
        reading: 'すーぷ',
        meaning: { en: 'soup', vi: 'súp', zh: '汤' },
      },
      {
        word: '最高',
        reading: 'さいこう',
        meaning: { en: 'the best', vi: 'tuyệt vời', zh: '最棒' },
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
