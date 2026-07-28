import type { Locale } from "@/lib/i18n/config";
import type {
  KanaCharacter,
  KanaCombination,
  KanaExample,
  KanaRow,
  KanaScript,
  KanaSoundRow,
} from "@/types/kana";

function example(
  word: string,
  reading: string,
  es: string,
  en: string,
): KanaExample {
  return { word, reading, meaning: { es, en } };
}

export const KANA_ROWS: readonly KanaRow[] = [
  { id: "a", group: "vowels", romaji: "a", hiragana: "あ", katakana: "ア", hiraganaExample: example("朝", "あさ", "mañana", "morning"), katakanaExample: example("アイス", "アイス", "helado", "ice cream") },
  { id: "i", group: "vowels", romaji: "i", hiragana: "い", katakana: "イ", hiraganaExample: example("犬", "いぬ", "perro", "dog"), katakanaExample: example("イタリア", "イタリア", "Italia", "Italy") },
  { id: "u", group: "vowels", romaji: "u", hiragana: "う", katakana: "ウ", hiraganaExample: example("海", "うみ", "mar", "sea"), katakanaExample: example("ウール", "ウール", "lana", "wool") },
  { id: "e", group: "vowels", romaji: "e", hiragana: "え", katakana: "エ", hiraganaExample: example("駅", "えき", "estación", "station"), katakanaExample: example("エアコン", "エアコン", "aire acondicionado", "air conditioner") },
  { id: "o", group: "vowels", romaji: "o", hiragana: "お", katakana: "オ", hiraganaExample: example("お茶", "おちゃ", "té", "tea"), katakanaExample: example("オレンジ", "オレンジ", "naranja", "orange") },
  { id: "ka", group: "k", romaji: "ka", hiragana: "か", katakana: "カ", hiraganaExample: example("傘", "かさ", "paraguas", "umbrella"), katakanaExample: example("カメラ", "カメラ", "cámara", "camera") },
  { id: "ki", group: "k", romaji: "ki", hiragana: "き", katakana: "キ", hiraganaExample: example("木", "き", "árbol", "tree"), katakanaExample: example("キウイ", "キウイ", "kiwi", "kiwi") },
  { id: "ku", group: "k", romaji: "ku", hiragana: "く", katakana: "ク", hiraganaExample: example("靴", "くつ", "zapatos", "shoes"), katakanaExample: example("クラス", "クラス", "clase", "class") },
  { id: "ke", group: "k", romaji: "ke", hiragana: "け", katakana: "ケ", hiraganaExample: example("今朝", "けさ", "esta mañana", "this morning"), katakanaExample: example("ケーキ", "ケーキ", "pastel", "cake") },
  { id: "ko", group: "k", romaji: "ko", hiragana: "こ", katakana: "コ", hiraganaExample: example("声", "こえ", "voz", "voice"), katakanaExample: example("コーヒー", "コーヒー", "café", "coffee") },
  { id: "sa", group: "s", romaji: "sa", hiragana: "さ", katakana: "サ", hiraganaExample: example("魚", "さかな", "pez", "fish"), katakanaExample: example("サラダ", "サラダ", "ensalada", "salad") },
  { id: "shi", group: "s", romaji: "shi", hiragana: "し", katakana: "シ", hiraganaExample: example("塩", "しお", "sal", "salt"), katakanaExample: example("シャツ", "シャツ", "camisa", "shirt") },
  { id: "su", group: "s", romaji: "su", hiragana: "す", katakana: "ス", hiraganaExample: example("寿司", "すし", "sushi", "sushi"), katakanaExample: example("スープ", "スープ", "sopa", "soup") },
  { id: "se", group: "s", romaji: "se", hiragana: "せ", katakana: "セ", hiraganaExample: example("世界", "せかい", "mundo", "world"), katakanaExample: example("セーター", "セーター", "suéter", "sweater") },
  { id: "so", group: "s", romaji: "so", hiragana: "そ", katakana: "ソ", hiraganaExample: example("空", "そら", "cielo", "sky"), katakanaExample: example("ソファ", "ソファ", "sofá", "sofa") },
  { id: "ta", group: "t", romaji: "ta", hiragana: "た", katakana: "タ", hiraganaExample: example("卵", "たまご", "huevo", "egg"), katakanaExample: example("タクシー", "タクシー", "taxi", "taxi") },
  { id: "chi", group: "t", romaji: "chi", hiragana: "ち", katakana: "チ", hiraganaExample: example("地図", "ちず", "mapa", "map"), katakanaExample: example("チーズ", "チーズ", "queso", "cheese") },
  { id: "tsu", group: "t", romaji: "tsu", hiragana: "つ", katakana: "ツ", hiraganaExample: example("月", "つき", "luna", "moon"), katakanaExample: example("ツアー", "ツアー", "recorrido", "tour") },
  { id: "te", group: "t", romaji: "te", hiragana: "て", katakana: "テ", hiraganaExample: example("手", "て", "mano", "hand"), katakanaExample: example("テスト", "テスト", "examen", "test") },
  { id: "to", group: "t", romaji: "to", hiragana: "と", katakana: "ト", hiraganaExample: example("時計", "とけい", "reloj", "clock"), katakanaExample: example("トマト", "トマト", "tomate", "tomato") },
  { id: "na", group: "n", romaji: "na", hiragana: "な", katakana: "ナ", hiraganaExample: example("夏", "なつ", "verano", "summer"), katakanaExample: example("ナイフ", "ナイフ", "cuchillo", "knife") },
  { id: "ni", group: "n", romaji: "ni", hiragana: "に", katakana: "ニ", hiraganaExample: example("庭", "にわ", "jardín", "garden"), katakanaExample: example("ニット", "ニット", "tejido de punto", "knitwear") },
  { id: "nu", group: "n", romaji: "nu", hiragana: "ぬ", katakana: "ヌ", hiraganaExample: example("布", "ぬの", "tela", "cloth"), katakanaExample: example("ヌードル", "ヌードル", "fideos", "noodles") },
  { id: "ne", group: "n", romaji: "ne", hiragana: "ね", katakana: "ネ", hiraganaExample: example("猫", "ねこ", "gato", "cat"), katakanaExample: example("ネクタイ", "ネクタイ", "corbata", "necktie") },
  { id: "no", group: "n", romaji: "no", hiragana: "の", katakana: "ノ", hiraganaExample: example("海苔", "のり", "alga nori", "nori seaweed"), katakanaExample: example("ノート", "ノート", "cuaderno", "notebook") },
  { id: "ha", group: "h", romaji: "ha", hiragana: "は", katakana: "ハ", hiraganaExample: example("花", "はな", "flor", "flower"), katakanaExample: example("ハンバーガー", "ハンバーガー", "hamburguesa", "hamburger") },
  { id: "hi", group: "h", romaji: "hi", hiragana: "ひ", katakana: "ヒ", hiraganaExample: example("人", "ひと", "persona", "person"), katakanaExample: example("ヒーター", "ヒーター", "calefactor", "heater") },
  { id: "fu", group: "h", romaji: "fu", hiragana: "ふ", katakana: "フ", hiraganaExample: example("船", "ふね", "barco", "ship"), katakanaExample: example("フルーツ", "フルーツ", "fruta", "fruit") },
  { id: "he", group: "h", romaji: "he", hiragana: "へ", katakana: "ヘ", hiraganaExample: example("部屋", "へや", "habitación", "room"), katakanaExample: example("ヘルメット", "ヘルメット", "casco", "helmet") },
  { id: "ho", group: "h", romaji: "ho", hiragana: "ほ", katakana: "ホ", hiraganaExample: example("星", "ほし", "estrella", "star"), katakanaExample: example("ホテル", "ホテル", "hotel", "hotel") },
  { id: "ma", group: "m", romaji: "ma", hiragana: "ま", katakana: "マ", hiraganaExample: example("窓", "まど", "ventana", "window"), katakanaExample: example("マンガ", "マンガ", "manga", "manga") },
  { id: "mi", group: "m", romaji: "mi", hiragana: "み", katakana: "ミ", hiraganaExample: example("水", "みず", "agua", "water"), katakanaExample: example("ミルク", "ミルク", "leche", "milk") },
  { id: "mu", group: "m", romaji: "mu", hiragana: "む", katakana: "ム", hiraganaExample: example("虫", "むし", "insecto", "insect"), katakanaExample: example("ムービー", "ムービー", "película", "movie") },
  { id: "me", group: "m", romaji: "me", hiragana: "め", katakana: "メ", hiraganaExample: example("目", "め", "ojo", "eye"), katakanaExample: example("メニュー", "メニュー", "menú", "menu") },
  { id: "mo", group: "m", romaji: "mo", hiragana: "も", katakana: "モ", hiraganaExample: example("森", "もり", "bosque", "forest"), katakanaExample: example("モデル", "モデル", "modelo", "model") },
  { id: "ya", group: "y", romaji: "ya", hiragana: "や", katakana: "ヤ", hiraganaExample: example("山", "やま", "montaña", "mountain"), katakanaExample: example("ヤード", "ヤード", "yarda", "yard") },
  { id: "yu", group: "y", romaji: "yu", hiragana: "ゆ", katakana: "ユ", hiraganaExample: example("雪", "ゆき", "nieve", "snow"), katakanaExample: example("ユニフォーム", "ユニフォーム", "uniforme", "uniform") },
  { id: "yo", group: "y", romaji: "yo", hiragana: "よ", katakana: "ヨ", hiraganaExample: example("夜", "よる", "noche", "night"), katakanaExample: example("ヨーグルト", "ヨーグルト", "yogur", "yogurt") },
  { id: "ra", group: "r", romaji: "ra", hiragana: "ら", katakana: "ラ", hiraganaExample: example("来年", "らいねん", "próximo año", "next year"), katakanaExample: example("ラジオ", "ラジオ", "radio", "radio") },
  { id: "ri", group: "r", romaji: "ri", hiragana: "り", katakana: "リ", hiraganaExample: example("林檎", "りんご", "manzana", "apple"), katakanaExample: example("リモコン", "リモコン", "control remoto", "remote control") },
  { id: "ru", group: "r", romaji: "ru", hiragana: "る", katakana: "ル", hiraganaExample: example("留守", "るす", "ausencia", "absence"), katakanaExample: example("ルール", "ルール", "regla", "rule") },
  { id: "re", group: "r", romaji: "re", hiragana: "れ", katakana: "レ", hiraganaExample: example("歴史", "れきし", "historia", "history"), katakanaExample: example("レモン", "レモン", "limón", "lemon") },
  { id: "ro", group: "r", romaji: "ro", hiragana: "ろ", katakana: "ロ", hiraganaExample: example("廊下", "ろうか", "pasillo", "hallway"), katakanaExample: example("ロボット", "ロボット", "robot", "robot") },
  { id: "wa", group: "w", romaji: "wa", hiragana: "わ", katakana: "ワ", hiraganaExample: example("私", "わたし", "yo", "I"), katakanaExample: example("ワイン", "ワイン", "vino", "wine") },
  { id: "wo", group: "w", romaji: "o (wo)", hiragana: "を", katakana: "ヲ", hiraganaExample: example("水を飲む", "みずをのむ", "beber agua", "drink water"), katakanaExample: example("ヲ", "ヲ", "partícula o estilización", "particle or stylized use") },
  { id: "n", group: "w", romaji: "n", hiragana: "ん", katakana: "ン", hiraganaExample: example("本", "ほん", "libro", "book"), katakanaExample: example("パン", "パン", "pan", "bread") },
  { id: "ga", group: "dakuten", romaji: "ga", hiragana: "が", katakana: "ガ", hiraganaExample: example("学校", "がっこう", "escuela", "school"), katakanaExample: example("ガス", "ガス", "gas", "gas") },
  { id: "gi", group: "dakuten", romaji: "gi", hiragana: "ぎ", katakana: "ギ", hiraganaExample: example("銀行", "ぎんこう", "banco", "bank"), katakanaExample: example("ギター", "ギター", "guitarra", "guitar") },
  { id: "gu", group: "dakuten", romaji: "gu", hiragana: "ぐ", katakana: "グ", hiraganaExample: example("具合", "ぐあい", "estado / condición", "condition"), katakanaExample: example("グラス", "グラス", "vaso", "glass") },
  { id: "ge", group: "dakuten", romaji: "ge", hiragana: "げ", katakana: "ゲ", hiraganaExample: example("元気", "げんき", "salud / energía", "well / energetic"), katakanaExample: example("ゲーム", "ゲーム", "juego", "game") },
  { id: "go", group: "dakuten", romaji: "go", hiragana: "ご", katakana: "ゴ", hiraganaExample: example("ご飯", "ごはん", "comida / arroz cocido", "meal / cooked rice"), katakanaExample: example("ゴルフ", "ゴルフ", "golf", "golf") },
  { id: "za", group: "dakuten", romaji: "za", hiragana: "ざ", katakana: "ザ", hiraganaExample: example("雑誌", "ざっし", "revista", "magazine"), katakanaExample: example("ザ・ベスト", "ザ・ベスト", "lo mejor", "the best") },
  { id: "ji", group: "dakuten", romaji: "ji", hiragana: "じ", katakana: "ジ", hiraganaExample: example("時間", "じかん", "tiempo", "time"), katakanaExample: example("ジム", "ジム", "gimnasio", "gym") },
  { id: "zu", group: "dakuten", romaji: "zu", hiragana: "ず", katakana: "ズ", hiraganaExample: example("水", "みず", "agua", "water"), katakanaExample: example("ズボン", "ズボン", "pantalón", "trousers") },
  { id: "ze", group: "dakuten", romaji: "ze", hiragana: "ぜ", katakana: "ゼ", hiraganaExample: example("全部", "ぜんぶ", "todo", "all"), katakanaExample: example("ゼリー", "ゼリー", "gelatina", "jelly") },
  { id: "zo", group: "dakuten", romaji: "zo", hiragana: "ぞ", katakana: "ゾ", hiraganaExample: example("象", "ぞう", "elefante", "elephant"), katakanaExample: example("ゾーン", "ゾーン", "zona", "zone") },
  { id: "da", group: "dakuten", romaji: "da", hiragana: "だ", katakana: "ダ", hiraganaExample: example("大学", "だいがく", "universidad", "university"), katakanaExample: example("ダンス", "ダンス", "baile", "dance") },
  { id: "di", group: "dakuten", romaji: "ji (di)", hiragana: "ぢ", katakana: "ヂ", hiraganaExample: example("鼻血", "はなぢ", "sangrado nasal", "nosebleed"), katakanaExample: example("ヂ", "ヂ", "uso poco frecuente", "rare use") },
  { id: "du", group: "dakuten", romaji: "zu (du)", hiragana: "づ", katakana: "ヅ", hiraganaExample: example("気付く", "きづく", "darse cuenta", "notice"), katakanaExample: example("ヅ", "ヅ", "uso poco frecuente", "rare use") },
  { id: "de", group: "dakuten", romaji: "de", hiragana: "で", katakana: "デ", hiraganaExample: example("出口", "でぐち", "salida", "exit"), katakanaExample: example("デスク", "デスク", "escritorio", "desk") },
  { id: "do", group: "dakuten", romaji: "do", hiragana: "ど", katakana: "ド", hiraganaExample: example("道路", "どうろ", "carretera", "road"), katakanaExample: example("ドア", "ドア", "puerta", "door") },
  { id: "ba", group: "dakuten", romaji: "ba", hiragana: "ば", katakana: "バ", hiraganaExample: example("場所", "ばしょ", "lugar", "place"), katakanaExample: example("バス", "バス", "autobús", "bus") },
  { id: "bi", group: "dakuten", romaji: "bi", hiragana: "び", katakana: "ビ", hiraganaExample: example("海老", "えび", "camarón", "shrimp"), katakanaExample: example("ビル", "ビル", "edificio", "building") },
  { id: "bu", group: "dakuten", romaji: "bu", hiragana: "ぶ", katakana: "ブ", hiraganaExample: example("歌舞伎", "かぶき", "kabuki", "kabuki"), katakanaExample: example("ブラシ", "ブラシ", "cepillo", "brush") },
  { id: "be", group: "dakuten", romaji: "be", hiragana: "べ", katakana: "ベ", hiraganaExample: example("弁当", "べんとう", "comida en caja", "boxed lunch"), katakanaExample: example("ベッド", "ベッド", "cama", "bed") },
  { id: "bo", group: "dakuten", romaji: "bo", hiragana: "ぼ", katakana: "ボ", hiraganaExample: example("帽子", "ぼうし", "sombrero", "hat"), katakanaExample: example("ボタン", "ボタン", "botón", "button") },
  { id: "pa", group: "handakuten", romaji: "pa", hiragana: "ぱ", katakana: "パ", hiraganaExample: example("ぱんだ", "ぱんだ", "panda", "panda"), katakanaExample: example("パン", "パン", "pan", "bread") },
  { id: "pi", group: "handakuten", romaji: "pi", hiragana: "ぴ", katakana: "ピ", hiraganaExample: example("鉛筆", "えんぴつ", "lápiz", "pencil"), katakanaExample: example("ピアノ", "ピアノ", "piano", "piano") },
  { id: "pu", group: "handakuten", romaji: "pu", hiragana: "ぷ", katakana: "プ", hiraganaExample: example("天ぷら", "てんぷら", "tempura", "tempura"), katakanaExample: example("プール", "プール", "piscina", "pool") },
  { id: "pe", group: "handakuten", romaji: "pe", hiragana: "ぺ", katakana: "ペ", hiraganaExample: example("ぺこぺこ", "ぺこぺこ", "muy hambriento", "very hungry"), katakanaExample: example("ペン", "ペン", "bolígrafo", "pen") },
  { id: "po", group: "handakuten", romaji: "po", hiragana: "ぽ", katakana: "ポ", hiraganaExample: example("散歩", "さんぽ", "paseo", "walk"), katakanaExample: example("ポスト", "ポスト", "buzón", "postbox") },
] as const;

export const KANA_COMBINATIONS: readonly KanaCombination[] = [
  { romaji: "kya", hiragana: "きゃ", katakana: "キャ", example: example("客", "きゃく", "cliente / invitado", "customer / guest") },
  { romaji: "kyu", hiragana: "きゅ", katakana: "キュ", example: example("きゅうり", "きゅうり", "pepino", "cucumber") },
  { romaji: "kyo", hiragana: "きょ", katakana: "キョ", example: example("今日", "きょう", "hoy", "today") },
  { romaji: "gya", hiragana: "ぎゃ", katakana: "ギャ", example: example("逆", "ぎゃく", "opuesto", "opposite") },
  { romaji: "gyu", hiragana: "ぎゅ", katakana: "ギュ", example: example("牛乳", "ぎゅうにゅう", "leche", "milk") },
  { romaji: "gyo", hiragana: "ぎょ", katakana: "ギョ", example: example("餃子", "ぎょうざ", "gyoza", "gyoza") },
  { romaji: "sha", hiragana: "しゃ", katakana: "シャ", example: example("写真", "しゃしん", "fotografía", "photograph") },
  { romaji: "shu", hiragana: "しゅ", katakana: "シュ", example: example("宿題", "しゅくだい", "tarea", "homework") },
  { romaji: "sho", hiragana: "しょ", katakana: "ショ", example: example("醤油", "しょうゆ", "salsa de soja", "soy sauce") },
  { romaji: "ja", hiragana: "じゃ", katakana: "ジャ", example: example("邪魔", "じゃま", "obstáculo / molestia", "obstacle / nuisance") },
  { romaji: "ju", hiragana: "じゅ", katakana: "ジュ", example: example("十", "じゅう", "diez", "ten") },
  { romaji: "jo", hiragana: "じょ", katakana: "ジョ", example: example("上手", "じょうず", "hábil", "skillful") },
  { romaji: "cha", hiragana: "ちゃ", katakana: "チャ", example: example("お茶", "おちゃ", "té", "tea") },
  { romaji: "chu", hiragana: "ちゅ", katakana: "チュ", example: example("中学", "ちゅうがく", "secundaria básica", "junior high school") },
  { romaji: "cho", hiragana: "ちょ", katakana: "チョ", example: example("蝶", "ちょう", "mariposa", "butterfly") },
  { romaji: "nya", hiragana: "にゃ", katakana: "ニャ", example: example("にゃんこ", "にゃんこ", "gatito", "kitty") },
  { romaji: "nyu", hiragana: "にゅ", katakana: "ニュ", example: example("ニュース", "ニュース", "noticias", "news") },
  { romaji: "nyo", hiragana: "にょ", katakana: "ニョ", example: example("にょろにょろ", "にょろにょろ", "serpenteando", "slithering") },
  { romaji: "hya", hiragana: "ひゃ", katakana: "ヒャ", example: example("百", "ひゃく", "cien", "one hundred") },
  { romaji: "hyu", hiragana: "ひゅ", katakana: "ヒュ", example: example("ひゅうひゅう", "ひゅうひゅう", "silbando el viento", "wind whistling") },
  { romaji: "hyo", hiragana: "ひょ", katakana: "ヒョ", example: example("表", "ひょう", "tabla", "chart") },
  { romaji: "bya", hiragana: "びゃ", katakana: "ビャ", example: example("三百", "さんびゃく", "trescientos", "three hundred") },
  { romaji: "byu", hiragana: "びゅ", katakana: "ビュ", example: example("びゅうびゅう", "びゅうびゅう", "rugiendo el viento", "wind howling") },
  { romaji: "byo", hiragana: "びょ", katakana: "ビョ", example: example("病院", "びょういん", "hospital", "hospital") },
  { romaji: "pya", hiragana: "ぴゃ", katakana: "ピャ", example: example("ぴゃあぴゃあ", "ぴゃあぴゃあ", "llanto agudo", "shrill crying") },
  { romaji: "pyu", hiragana: "ぴゅ", katakana: "ピュ", example: example("ぴゅうぴゅう", "ぴゅうぴゅう", "silbido rápido", "swift whistling") },
  { romaji: "pyo", hiragana: "ぴょ", katakana: "ピョ", example: example("ぴょんぴょん", "ぴょんぴょん", "dando saltitos", "hopping") },
  { romaji: "mya", hiragana: "みゃ", katakana: "ミャ", example: example("脈", "みゃく", "pulso", "pulse") },
  { romaji: "myu", hiragana: "みゅ", katakana: "ミュ", example: example("ミュージック", "ミュージック", "música", "music") },
  { romaji: "myo", hiragana: "みょ", katakana: "ミョ", example: example("名字", "みょうじ", "apellido", "surname") },
  { romaji: "rya", hiragana: "りゃ", katakana: "リャ", example: example("略", "りゃく", "abreviación", "abbreviation") },
  { romaji: "ryu", hiragana: "りゅ", katakana: "リュ", example: example("留学", "りゅうがく", "estudios en el extranjero", "study abroad") },
  { romaji: "ryo", hiragana: "りょ", katakana: "リョ", example: example("旅行", "りょこう", "viaje", "trip") },
] as const;

export function kanaKey(script: KanaScript, id: string): string {
  return `${script}:${id}`;
}

const VALID_KANA_KEYS = new Set(
  KANA_ROWS.flatMap((row) => [
    kanaKey("hiragana", row.id),
    kanaKey("katakana", row.id),
  ]),
);

export function isKanaKey(value: unknown): value is string {
  return typeof value === "string" && VALID_KANA_KEYS.has(value);
}

export const KANA_SOUND_ROW_ORDER: readonly KanaSoundRow[] = [
  "vowels",
  "k",
  "s",
  "t",
  "n",
  "h",
  "m",
  "y",
  "r",
  "w",
  "g",
  "z",
  "d",
  "b",
  "p",
];

function getSoundRow(row: KanaRow): KanaSoundRow {
  if (row.group === "handakuten") return "p";
  if (row.group !== "dakuten") return row.group as KanaSoundRow;

  if (row.id.startsWith("g")) return "g";
  if (["za", "ji", "zu", "ze", "zo"].includes(row.id)) return "z";
  if (row.id.startsWith("d")) return "d";
  return "b";
}

export function getKanaCharacters(
  script: KanaScript,
  locale: Locale,
): KanaCharacter[] {
  return KANA_ROWS.map((row) => {
    const selectedExample =
      script === "hiragana"
        ? row.hiraganaExample
        : row.katakanaExample;

    return {
      character: row[script],
      exampleMeaning: selectedExample.meaning[locale],
      exampleReading: selectedExample.reading,
      exampleWord: selectedExample.word,
      group: row.group,
      key: kanaKey(script, row.id),
      romaji: row.romaji,
      script,
      soundRow: getSoundRow(row),
    };
  });
}

export function getLocalizedCombinations(locale: Locale) {
  return KANA_COMBINATIONS.map((combination) => ({
    ...combination,
    example: {
      reading: combination.example.reading,
      word: combination.example.word,
      meaning: combination.example.meaning[locale],
    },
  }));
}
