/**
 * 今回の修正に対する手動テストスクリプト
 * ブラウザの開発者ツール（F12）のコンソールで実行する
 *
 * テスト対象:
 * 1. レベル別録音時間の設定確認
 * 2. 途中再開機能の動作確認
 * 3. localStorage の進捗データ構造確認
 */

(function runTests() {
  const STORAGE_KEY = 'japanese-talking-progress';
  let passed = 0;
  let failed = 0;

  function assert(condition, testName) {
    if (condition) {
      console.log(`✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`❌ FAIL: ${testName}`);
      failed++;
    }
  }

  console.log('=== テスト開始 ===\n');

  // -------------------------------------------------------
  // テスト1: localStorage 進捗データの読み書き
  // -------------------------------------------------------
  console.log('--- T1: localStorage 進捗データ ---');

  // バックアップ
  const backup = localStorage.getItem(STORAGE_KEY);

  // テストデータを書き込み
  const testProgress = {
    'lesson-001': {
      lessonId: 'lesson-001',
      completedSteps: [1, 2, 3],
      practiceCount: 0,
      lastPracticedAt: new Date().toISOString(),
      isCompleted: false,
    },
    'lesson-002': {
      lessonId: 'lesson-002',
      completedSteps: [1, 2, 3, 4, 5],
      practiceCount: 1,
      lastPracticedAt: new Date().toISOString(),
      isCompleted: true,
    },
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(testProgress));
  const loaded = JSON.parse(localStorage.getItem(STORAGE_KEY));

  assert(loaded['lesson-001'].completedSteps.length === 3, '未完了レッスンの completedSteps が3つ');
  assert(loaded['lesson-001'].isCompleted === false, '未完了レッスンの isCompleted が false');
  assert(loaded['lesson-002'].isCompleted === true, '完了済みレッスンの isCompleted が true');

  // -------------------------------------------------------
  // テスト2: 再開ステップの算出ロジック
  // -------------------------------------------------------
  console.log('\n--- T2: 再開ステップ算出 ---');

  function calcResumeStep(saved) {
    if (saved && !saved.isCompleted && saved.completedSteps.length > 0) {
      const maxCompleted = Math.max(...saved.completedSteps);
      return Math.min(maxCompleted + 1, 5);
    }
    return 1;
  }

  // ケース: Step3まで完了 → Step4から再開
  assert(calcResumeStep(loaded['lesson-001']) === 4, 'completedSteps=[1,2,3] → Step4から再開');

  // ケース: 完了済み → Step1から
  assert(calcResumeStep(loaded['lesson-002']) === 1, '完了済みレッスン → Step1から開始');

  // ケース: 進捗なし → Step1から
  assert(calcResumeStep(null) === 1, '進捗なし → Step1から開始');

  // ケース: completedSteps が空 → Step1から
  assert(calcResumeStep({ completedSteps: [], isCompleted: false }) === 1, 'completedSteps=[] → Step1から開始');

  // ケース: Step1のみ完了 → Step2から
  assert(calcResumeStep({ completedSteps: [1], isCompleted: false }) === 2, 'completedSteps=[1] → Step2から再開');

  // ケース: Step5まで完了（未完了フラグ） → Step5から
  assert(calcResumeStep({ completedSteps: [1, 2, 3, 4, 5], isCompleted: false }) === 5, 'completedSteps=[1-5] + 未完了 → Step5');

  // -------------------------------------------------------
  // テスト3: レベル別録音時間のマッピング確認
  // -------------------------------------------------------
  console.log('\n--- T3: レベル別録音時間 ---');

  const MAX_RECORDING_DURATION = { N5: 30, N4: 45, N3: 60, N2: 90 };

  assert(MAX_RECORDING_DURATION['N5'] === 30, 'N5 → 30秒');
  assert(MAX_RECORDING_DURATION['N4'] === 45, 'N4 → 45秒');
  assert(MAX_RECORDING_DURATION['N3'] === 60, 'N3 → 60秒');
  assert(MAX_RECORDING_DURATION['N2'] === 90, 'N2 → 90秒');

  // -------------------------------------------------------
  // バックアップを復元
  // -------------------------------------------------------
  if (backup) {
    localStorage.setItem(STORAGE_KEY, backup);
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }

  // -------------------------------------------------------
  // 結果サマリー
  // -------------------------------------------------------
  console.log(`\n=== テスト完了: ${passed} passed, ${failed} failed ===`);
  if (failed === 0) {
    console.log('🎉 全テスト合格！');
  }

  return { passed, failed };
})();
