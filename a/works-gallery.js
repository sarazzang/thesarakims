const WORKS=[
  {t:'서울은 나를 기억할까', k:'seoul', type:'contest', contest:'2026 AI 이미지 콘테스트 · 사단법인 한국사진작가협회', meta:'2026 · AI-generated image', award:'2026 AI 이미지 콘테스트 입선 · 사단법인 한국사진작가협회',
   lead:'오래된 흑백 사진 속 가족이 인화지 밖으로 걸어 나왔다.',
   desc:'그들에게 익숙했던 서울은 하늘을 찌르는 빌딩과 낯선 거리로 변해 있다. 아이는 감탄하고, 아버지는 길을 잃은 듯 두리번거리며, 할머니는 사라진 동네를 떠올리며 눈시울을 붉힌다. 그러나 지금의 서울을 걷는 사람들은 고개를 숙인 채 화면만 볼 뿐, 아무도 이들을 알아보지 못한다.'},
  {t:'만원(滿員)', k:'manwon', type:'contest', contest:'2026 AI 이미지 콘테스트 출품작', meta:'2026 · AI-generated image',
   lead:'출근길 지하철이 빈틈없이 가득 찼다. 그러나 좌석과 통로, 손잡이를 채운 것은 사람이 아니라 수백 대의 휴대폰이다.',
   desc:'창밖으로 햇살 가득한 한강과 남산이 지나가지만, 어떤 화면도 그쪽을 향하지 않는다. 사람으로 붐비는 도시에서 우리는 정말 그곳에 있는지를 묻는다.'},
  {t:'CROWD NOISE', k:'crowd', type:'commission', client:'뮤지션 7illin(홍승훈) 의뢰', meta:'2026 · 29.7 × 42 cm · AI-generated image, digital print on canvas',
   lead:'붉은색과 푸른색, 두 원색의 미세한 반복이 화면 전체를 덮는다. 거리에 따라 하나의 보라색 면으로 지각된다.',
   desc:'근접한 시선 앞에서 그 색의 입자는 같은 박자 위에 선 익명의 군중으로 전환된다. 중앙의 음파는 채색이 아닌 여백으로 구현되어, 부재가 곧 형상이 되는 역설을 드러낸다. 엄격한 반복의 질서 속에 놓인 단 하나의 어긋남, 누워 있는 한 인물만이 처음부터 혼색되지 않은 보라로 존재한다. 뮤지션 7illin(홍승훈)을 위해 제작되었다.'},
  {t:'Iassc', k:'iassc', type:'commission', client:'1:1 주문 제작', meta:'2026 · 53.0 × 72.7 cm · AI-generated image, print on canvas',
   lead:'멀리서는 단단하고, 가까이에서는 따뜻하다.<br>가장 깊이 갈라진 자리에, 가장 밝은 빛이 머문다.',
   desc:'Two dark forms rise from a single root, like a tree that does not bend. Their edges are cool, almost cold, but inside they are deep and warm. The space where they part, like a wound, is the brightest place in the painting.'},
  {t:'서울제색도', en:'Seoul After the Rain', k:'rain', type:'contest', contest:'2026 AI 이미지 콘테스트 출품작', meta:'2026 · AI-generated image',
   lead:'겸재 정선은 비 갠 뒤 안개 속에 드러나는 인왕산을 그렸다.',
   desc:'오늘날 서울의 산에 다시 안개가 걷히면, 그 능선은 금 가고 녹슨 낡은 콘크리트 건물들로 이루어져 있다. 「인왕제색도」의 구도에 AI 이미지를 결합해, 개발이 지나간 자리에 남은 서울의 또 다른 풍경을 묻는다.'},
  {t:'정체', en:'停滯', k:'jeongche', type:'contest', contest:'제28회 말 사진·AI 이미지 공모전 출품작 · 한국마사회', meta:'2026 · AI-generated image',
   lead:'광화문에서 일을 마치고 돌아가던 저녁, 세종대로는 꽉 막혀 있었다. 이 길은 원래 말이 달리던 길이었을 텐데.',
   desc:'빽빽한 차량 격자 한가운데 아스팔트를 걷어낸 흙 한 줌을 남겼다. 흙은 포장된 도시 아래 아직 남아 있는 옛길이고, 그 위에 선 흰 말은 그 길의 원래 주인이다. 말은 달리지도, 비켜서지도 않고 그저 제자리에 서 있다. 모든 것이 멈춘 순간에야 비로소 눈에 들어오는 존재처럼.'},
  {t:'Christian Barbershop', k:'ctb', type:'commission', client:'크리스천 바버샵 의뢰', meta:'2026 · 53.0 × 72.7 cm · AI-generated image, print on canvas',
   lead:'가장 낮은 곳에서 시작된 선.<br>그 선은 꺾이지 않고, 조용히 빛의 자리에 닿는다.',
   desc:'From the darkest ground, a single line rises without bending and becomes a cross. As it climbs, the green slowly grows clearer. This painting is about a place built on a new beginning.'}
];
const SONGS=[
  {t:'Somewhere in Between', kind:'Album · 10 tracks', v:'ZvQye3WgvJk', list:'OLAK5uy_mdBKWkoOWK8BAgu1wMXfNgx6xIPZ4GICY'},
  {t:'A Journey in Search of Light', kind:'Album · 7 tracks', v:'Lhkb1L6ePfY', list:'OLAK5uy_mvOSOOL-fh-OIhNDVzeVk8iJWE8bKjdzI'},
  {t:'고양이 김로로', kind:'Album · 4 tracks', v:'-oV8ZtT9ZSU', list:'OLAK5uy_l7xDqaRhlpWPsCNFj6MktNYtPb1BrHMwk'},
  {t:'自明 (자명)', kind:'Single', v:'4GC0jwdk_Bk'},
  {t:'보내줘야만 하는 너', kind:'Single', v:'y8MJMHDhiqc'},
  {t:'넌 참 웃기는 남자야', kind:'Single', v:'cLx6YLEMLsU'}
];
const SIZES={seoul:[1100,1375],manwon:[1100,619],crowd:[880,1100],rain:[1100,733],iassc:[821,1100],jeongche:[1100,733],ctb:[825,1100]};

/* 크기별 가격 — 여기 숫자만 바꾸면 갤러리 페이지 전체에 반영됩니다
   원가 참고(갤러리피플 타임특가, 2026-11): 3호 19,800 / 6호 29,800 / 10호 44,800 / 20호 72,800 / 30호 118,000
   + 캡션 2장(11×15cm) + 배송비 */
const PRICES=[
  {id:'3',  name:'캔버스 3호',  size:'27.3 × 22.0 cm', price:89000,  ship:true, note:'책상 · 선반 위 · 첫 선물로'},
  {id:'6',  name:'캔버스 6호',  size:'40.9 × 31.8 cm', price:129000, ship:true, note:'침실 · 현관 · 작은 벽'},
  {id:'10', name:'캔버스 10호', size:'53.0 × 45.5 cm', price:179000, ship:true, note:'거실 한쪽 벽 · 기념일 선물'},
  {id:'20', name:'캔버스 20호', size:'72.7 × 53.0 cm', price:259000, ship:true, note:'전시작과 같은 크기', best:true},
  {id:'30', name:'캔버스 30호', size:'90.9 × 65.1 cm', price:359000, ship:true, note:'거실 메인 · 매장 인테리어'}
];
