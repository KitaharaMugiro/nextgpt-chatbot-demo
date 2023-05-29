import { Conversation } from '../../types/chat';
import { FolderInterface } from '../../types/folder';
import {
  OpenAIModelID,
  OpenAIModels,
  fallbackModelID,
} from '../../types/openai';
import { Prompt } from '../../types/prompt';

import { DEFAULT_TEMPERATURE } from '../app/const';

import { v4 as uuidv4 } from 'uuid';

const defaultModelId =
  (process.env.DEFAULT_MODEL &&
    Object.values(OpenAIModelID).includes(
      process.env.DEFAULT_MODEL as OpenAIModelID,
    ) &&
    (process.env.DEFAULT_MODEL as OpenAIModelID)) ||
  fallbackModelID;

export const initialFolders: FolderInterface[] = [
  {
    id: '1',
    name: '経営・事業企画',
    type: 'chat',
  },
  {
    id: '2',
    name: '生産・物流・購買',
    type: 'chat',
  },
  {
    id: '3',
    name: '広報・マーケティング',
    type: 'chat',
  },
  {
    id: '4',
    name: '営業',
    type: 'chat',
  },
  {
    id: '5',
    name: '経営・事業企画',
    type: 'prompt',
  },

  {
    id: '6',
    name: '生産・物流・購買',
    type: 'prompt',
  },

  {
    id: '7',
    name: '広報・マーケティング',
    type: 'prompt',
  },

  {
    id: '8',
    name: '営業',
    type: 'prompt',
  },
];

export const initialPrompts: Prompt[] = [
  {
    id: uuidv4(),
    name: '新規事業のアイデア',
    description: '新規事業のアイデアを出す',
    content: `あなたは一流のWebサービスの企画担当です。
      AIを利用した新しいサービスを企画しようと考えています。
      
      #制約条件
      ・ユーザーは大学生で、試験対策のニーズを捉えたい。
      ・ユーザーがWebサービスをリピート訪問してくれるようなアイデアが望ましいです。
      
      #指示
      ・独創的で、まだ誰も思いついていないような、新しいサービスのアイデアのタイトルを5つ出してください。
      
      No repeat, no remarks, only results, in Japanese:`,
    model: {
      id: OpenAIModels[defaultModelId].id,
      name: OpenAIModels[defaultModelId].name,
      maxLength: OpenAIModels[defaultModelId].maxLength,
      tokenLimit: OpenAIModels[defaultModelId].tokenLimit,
    },
    folderId: '5',
  },
  {
    id: uuidv4(),
    name: '市場分析',
    description: '市場分析をして商品開発へ繋げる',
    content: `【市場】（商品ジャンル）:
    スパークリング・ワイン
    
    上記の{市場}における【競合分析】をして、競合の特徴を表形式で整理してください。
    さらに、【ターゲット顧客の特徴】について箇条書きで教えて下さい。`,
    model: {
      id: OpenAIModels[defaultModelId].id,
      name: OpenAIModels[defaultModelId].name,
      maxLength: OpenAIModels[defaultModelId].maxLength,
      tokenLimit: OpenAIModels[defaultModelId].tokenLimit,
    },
    folderId: '6',
  },
  {
    id: uuidv4(),
    name: '広報のキャッチフレーズ',
    description: '広報のキャッチフレーズを教えてもらう',
    content: `魅力的な出力が得られるように、ステップ・バイ・ステップで段階的に考えていきましょう。
    出力するように指示があるまで、出力はしないで下さい。
    
    あなたは有名な一流コピーライターとしてふるまって下さい。過去の作品例も参考にして下さい。
    
    #過去の作品例:
    ・わたしらしくをあたらしく
    ・ココロも満タンに
    ・愛は食卓にある。
    ・恋が着せ、愛が脱がせる。
    ・あったかい夜をプリーズ。
    ・本当の主役は、あなたです。
    ・自分は、きっと想像以上だ。
    ・おしりだって、洗ってほしい。
    ・恋を何年、休んでますか。
    
    #前提: もうすぐゴールデンウィークです。
    #広告主: 鉄道会社
    #販売商品: 箱根への旅行
    #禁止ワード: 箱根、自分、鉄道
    
    {前提}をふまえ、{販売商品}の客を増やすために、{広告主}が広告を打つときのキャッチフレーズ案が必要です。
    
    まず、{広告主}がどのようなイメージを{販売商品}の広告で人々に与えようとしているかを、文章にまとめて、変数{P1}に代入します。
    
    次に、{販売商品}に少しだけの興味を持つ人で、一番多いと思われる「居住地、年齢、性別、年収、性格、職種」を予想しますが、絶対に出力はしません。次に、その人の「顕在ニーズと潜在ニーズ」の詳細を考えます。次に、その潜在ニーズのみを文章にまとめて、変数{P2}に代入します。
    
    次に、変数{P2}のような客が、{前提}の下で{販売商品}を体験したことで、心が大きく揺さぶられたストーリーを考えて、客がどのような感動・発見をしたかを文章にまとめて、変数{P3}に代入します。
    
    次に、変数{P1}、変数{P2}、変数{P3}の内容を踏まえて、{広告主}が広告を打つときの、想像を掻き立てるような、絶対に説明的ではない、とても印象的で感性的で簡潔なキャッチフレーズ案を、いずれの{禁止ワード}もキャッチフレーズの全ての案の中で一度も使わないように注意して、あなたの頭の中で50個考えますが、まだ絶対に出力しないでください。
    
    50個考えたら、その中から、下記の{評価基準}による評価値の合計がもっとも高くなるような案を厳選して、上位10個の案だけを出力してください。プロセスや説明は書かないでください。結果のみを出力して下さい。
    
    #評価基準:
    ・覚えやすさ
    ・文章の短さ
    ・期待感
    ・オリジナリティ
    ・ハッとした気づきがあるか
    ・心が揺さぶられるインパクトの大きさ
    
    
    No repeat, no remarks, only results.
    Exclude all prohibited words listed earlier from your catchphrase ideas.
    in Japanese:`,
    model: {
      id: OpenAIModels[defaultModelId].id,
      name: OpenAIModels[defaultModelId].name,
      maxLength: OpenAIModels[defaultModelId].maxLength,
      tokenLimit: OpenAIModels[defaultModelId].tokenLimit,
    },
    folderId: '7',
  },
  {
    id: uuidv4(),
    name: 'アンケート分析',
    description: 'アンケート分析をして課題を整理する',
    content: `以下を読んだら「YES」と言ってください。

    #データや情報：
    以下は、弊社によせられた消費者からのクレームです。
    
    【クレーム】
    1. 味が薄いと感じました。もう少し濃い味付けにしてほしいです。
    2. 開封時に袋が破れやすく、お菓子がこぼれてしまいました。
    3. 賞味期限が短すぎる
    4. アレルギー表示が見にくい場所にあるため、わかりやすくしてください。
    5. 広告と実際の商品の見た目が違いすぎてがっかりしました。
    6. お菓子の量が少なく感じるので、もう少し増やしてほしいです。
    7. 価格が高すぎると感じました。
    8. 包装が無駄に大きく、環境に配慮してほしいと思います。
    9. お菓子が固くて食べにくかったです。
    10. 販売店が限られていて手に入れにくい。もっと多くの店舗で取り扱ってほしい。
    11. 甘さが強すぎて食べづらい。甘さ控えめのバリエーションがあってもいいのでは
    12. 原材料の品質が低いと感じた。
    13. 食品添加物が多く使用されている。
    14. 商品のサイズが不揃いで、見た目が悪い。
    15. お菓子が小さすぎて食べにくい。
    16. 子供が食べるには辛すぎる。
    17. 商品説明が不十分で、どんなお菓子か分からない。
    18. 一部のお菓子が変色していた。
    19. 他社製品と同じかんじ
    20. 過剰な包装が不必要。シンプルな包装にしてほしい。`,
    model: {
      id: OpenAIModels[defaultModelId].id,
      name: OpenAIModels[defaultModelId].name,
      maxLength: OpenAIModels[defaultModelId].maxLength,
      tokenLimit: OpenAIModels[defaultModelId].tokenLimit,
    },
    folderId: '8',
  },
];

export const initialConversations: Conversation[] = [
  {
    id: uuidv4(),
    name: '新規事業',
    messages: [],
    model: {
      id: OpenAIModels[defaultModelId].id,
      name: OpenAIModels[defaultModelId].name,
      maxLength: OpenAIModels[defaultModelId].maxLength,
      tokenLimit: OpenAIModels[defaultModelId].tokenLimit,
    },
    prompt: `あなたは新規事業立案者です。
    新たなビジネスのアイデアを探求しましょう。以下の質問について考え、具体的な事業アイデアを提案してください。
    
    あなたが解決したい問題や満たしたいニーズは何ですか？
    それに対する独自の解決策やアプローチはありますか？
    あなたの事業が提供する価値や利点は何ですか？
    類似する既存の事業や競合他社との差別化ポイントは何ですか？
    あなたのターゲット市場や顧客層はどのようなものですか？
    これらの質問に基づいて、あなたの新規事業のコンセプトや独自性を具体的に説明してください。`,
    temperature: DEFAULT_TEMPERATURE,
    folderId: '1',
  },
  {
    id: uuidv4(),
    name: '市場分析',
    messages: [],
    model: {
      id: OpenAIModels[defaultModelId].id,
      name: OpenAIModels[defaultModelId].name,
      maxLength: OpenAIModels[defaultModelId].maxLength,
      tokenLimit: OpenAIModels[defaultModelId].tokenLimit,
    },
    prompt: `あなたは新規事業の市場分析を行っています。
    新しいビジネスの市場分析について考えてみましょう。以下の質問に基づいて、市場の現状やトレンド、顧客のニーズなどについて分析し、具体的な事業アイデアを検討してください。
    
    どのような市場に参入するかを決めていますか？その市場は成長していますか？
    現在の競合他社や既存の事業はどのような特徴や課題を抱えていますか？
    顧客のニーズや傾向は何ですか？市場のトレンドや変化はありますか？
    あなたの新規事業が提供する独自の価値や利点は何ですか？市場での競争力はどうですか？
    あなたのターゲット市場や顧客層はどのようなものですか？それらの人々の課題や要望は何ですか？
    これらの質問に基づいて、市場分析の結果を考慮した新規事業のアイデアを具体的に提案してください。市場のニーズやトレンドを踏まえた差別化ポイントや市場での競争力を考えることが重要です。`,
    temperature: DEFAULT_TEMPERATURE,
    folderId: '2',
  },
  {
    id: uuidv4(),
    name: 'キャッチフレーズを考える',
    messages: [],
    model: {
      id: OpenAIModels[defaultModelId].id,
      name: OpenAIModels[defaultModelId].name,
      maxLength: OpenAIModels[defaultModelId].maxLength,
      tokenLimit: OpenAIModels[defaultModelId].tokenLimit,
    },
    prompt: `あなたは新規事業のキャッチフレーズを考えています。
    魅力的なキャッチフレーズを創出しましょう。以下の質問に基づいて、あなたの新規事業のコンセプトや独自性を反映したキャッチフレーズを考えてください。
    
    あなたの事業が提供する価値や利点は何ですか？一言で表現するとしたら何ですか？
    ターゲット市場や顧客層に対して何を伝えたいですか？
    あなたの事業が解決する問題や満たすニーズを強調するキーワードは何ですか？
    あなたの事業の独自性や差別化ポイントを強調するキーワードは何ですか？
    キャッチフレーズを通じて顧客に感じさせたい印象や価値は何ですか？
    これらの質問に基づいて、短くて魅力的なキャッチフレーズを考えてください。そのキャッチフレーズがあなたの新規事業の特徴や魅力を引き立て、顧客に印象づける役割を果たすことが重要です。`,
    temperature: DEFAULT_TEMPERATURE,
    folderId: '5',
  },
  {
    id: uuidv4(),
    name: 'アポイントメント',
    messages: [],
    model: {
      id: OpenAIModels[defaultModelId].id,
      name: OpenAIModels[defaultModelId].name,
      maxLength: OpenAIModels[defaultModelId].maxLength,
      tokenLimit: OpenAIModels[defaultModelId].tokenLimit,
    },
    prompt: `あなたは日本の会社の総務部と人事部のプロです。

    4月から、新入社員が2名、中途採用が1名入社します。
    入社受け入れのためのTo-Doリストとスケジュールを
    
    日本の会社の事情と、日本の法令も意識しつつ、
    作成してください。
    
    No repeat, no remarks, only results, in Japanese:`,
    temperature: DEFAULT_TEMPERATURE,
    folderId: '7',
  },
  {
    id: uuidv4(),
    name: '営業メール',
    messages: [],
    model: {
      id: OpenAIModels[defaultModelId].id,
      name: OpenAIModels[defaultModelId].name,
      maxLength: OpenAIModels[defaultModelId].maxLength,
      tokenLimit: OpenAIModels[defaultModelId].tokenLimit,
    },
    prompt:
      'あなたは取引先に営業メールを書きます。相手を不快にさせないように気をつけて、メールを作成してください。',
    temperature: DEFAULT_TEMPERATURE,
    folderId: '4',
  },
];
