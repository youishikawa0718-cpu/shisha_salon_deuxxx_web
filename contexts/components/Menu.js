import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Menu = () => {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('leaf');

  const menuItems = {
    leaf: [
      {
        name: { ja: 'ブロンドリーフ', en: 'Blonde Leaf' },
        price: '¥2,800~',
        description: { 
          ja: '軽やかで吸いやすいのが特徴のシーシャ葉です。フレーバーの香りがダイレクトに楽しめるため、フルーツ系や甘い香りとの相性が抜群。初めてシーシャを楽しむ方や、マイルドな煙を好む方におすすめです。吸い心地は軽く、煙も柔らかいため、ゆったりとした時間を楽しみたい方にぴったりです。',
          en: 'Light and smooth shisha tobacco. Perfect for enjoying direct flavor notes, especially fruit and sweet varieties. Ideal for beginners or those who prefer mild smoke. The gentle smoking experience makes it perfect for relaxing sessions.'
        }
      },
      { 
        name: { ja: 'ダークリーフ', en: 'Dark Leaf' }, 
        price: '¥3,800~', 
        description: { 
          ja: '濃厚でしっかりとした喫味が楽しめるシーシャ葉です。重厚な香りと深みのある味わいが特徴で、スパイス系やタバコ系フレーバーとの相性が良いです。しっかりとした吸いごたえを求める方や、長時間ゆっくり楽しみたい方におすすめです。',
          en: 'Rich and full-bodied shisha tobacco with deep, complex flavors. Excellent with spice and tobacco-based flavors. Perfect for those seeking a stronger smoking experience and extended sessions.'
        }
      },
      { 
        name: { ja: 'シガーリーフ', en: 'Cigar Leaf' },
        price: '¥4,000~',
        description: { 
          ja: '葉巻のような独特の風味を持つシーシャ葉です。タバコ本来のコクや深い香りが特徴で、煙も濃く、リッチな体験を楽しめます。重めなタバコ感をしっかり味わいたい方や、シーシャの伝統的な喫煙体験を楽しみたい方に最適です。',
          en: 'Unique tobacco with cigar-like characteristics. Features rich tobacco essence and deep aroma with dense smoke for a luxurious experience. Perfect for those who appreciate strong tobacco flavor and traditional shisha experience.'
        }
      },
    ],
    drink: [
      // フルーツジュース
      { name: { ja: 'アップルジュース', en: 'Apple Juice' }, price: '¥600', description: { ja: '爽やかなリンゴの風味', en: 'Refreshing apple flavor' } },
      { name: { ja: 'オレンジジュース', en: 'Orange Juice' }, price: '¥600', description: { ja: '100%フレッシュオレンジの爽やかな味わい', en: '100% fresh orange refreshing taste' } },
      { name: { ja: 'パイナップルジュース', en: 'Pineapple Juice' }, price: '¥600', description: { ja: 'トロピカルな甘酸っぱさ', en: 'Tropical sweet and sour' } },
      { name: { ja: 'マンゴージュース', en: 'Mango Juice' }, price: '¥600', description: { ja: '濃厚で甘いマンゴーの風味', en: 'Rich and sweet mango flavor' } },
      { name: { ja: 'グアバジュース', en: 'Guava Juice' }, price: '¥700', description: { ja: 'エキゾチックなグアバの香り', en: 'Exotic guava aroma' } },
      
      // 炭酸飲料・エナジードリンク
      { name: { ja: 'レッドブル', en: 'Red Bull' }, price: '¥600', description: { ja: 'エナジードリンクの定番', en: 'Classic energy drink' } },
      { name: { ja: 'コーラ', en: 'Cola' }, price: '¥600', description: { ja: 'クラシックなコカ・コーラ', en: 'Classic Coca-Cola' } },
      { name: { ja: 'イヨシコーラ（伊良コーラ）', en: 'Iyoshi Cola (Ira Cola)' }, price: '¥700', description: { ja: '和漢植物使用のクラフトコーラ', en: 'Craft cola with Japanese herbs' } },
      { name: { ja: 'ジンジャーエール', en: 'Ginger Ale' }, price: '¥600', description: { ja: 'ピリッと辛口のジンジャー', en: 'Spicy dry ginger' } },
      { name: { ja: 'トニックウォーター', en: 'Tonic Water' }, price: '¥600', description: { ja: 'すっきりとした炭酸水', en: 'Refreshing sparkling water' } },
      
      // お茶類
      { name: { ja: 'ジャスミン茶', en: 'Jasmine Tea' }, price: '¥600', description: { ja: '香り高いジャスミン茶', en: 'Aromatic jasmine tea' } },
      { name: { ja: 'ウーロン茶', en: 'Oolong Tea' }, price: '¥600', description: { ja: 'さっぱりとしたウーロン茶', en: 'Refreshing oolong tea' } },
      { name: { ja: '緑茶', en: 'Green Tea' }, price: '¥600', description: { ja: '日本茶の定番', en: 'Classic Japanese tea' } },
      
      // コーヒー類
      { name: { ja: 'コーヒー', en: 'Coffee' }, price: '¥600', description: { ja: 'こだわりのブレンドコーヒー', en: 'Carefully crafted blend coffee' } },
      { name: { ja: 'カフェラテ', en: 'Cafe Latte' }, price: '¥600', description: { ja: 'エスプレッソとスチームミルクの絶妙なバランス', en: 'Perfect balance of espresso and steamed milk' } },
      
      // 温かいソフトドリンク
      { name: { ja: '紅茶', en: 'Black Tea' }, price: '¥800', description: { ja: '香り豊かな紅茶', en: 'Fragrant black tea' } },
      { name: { ja: '緑茶（温）', en: 'Hot Green Tea' }, price: '¥800', description: { ja: '温かい日本茶', en: 'Warm Japanese tea' } },
      { name: { ja: 'カモミールティー', en: 'Chamomile Tea' }, price: '¥800', description: { ja: 'リラックス効果のあるハーブティー', en: 'Relaxing herbal tea' } },
      { name: { ja: 'ローズヒップティー', en: 'Rosehip Tea' }, price: '¥800', description: { ja: 'ビタミンC豊富なローズ香るハーブティー', en: 'Vitamin C rich rosehip herbal tea' } },
      
      // ノンアルコールカクテル
      { name: { ja: 'シャーリーテンプル', en: 'Shirley Temple' }, price: '¥700', description: { ja: 'ジンジャーエールとグレナデンの定番モクテル', en: 'Classic mocktail with ginger ale and grenadine' } },
      { name: { ja: 'プッシーキャット', en: 'Pussycat' }, price: '¥700', description: { ja: 'フルーツミックスの甘いモクテル', en: 'Sweet fruit mix mocktail' } },
      { name: { ja: 'コークオレンジ', en: 'Coke Orange' }, price: '¥700', description: { ja: 'コーラとオレンジの爽やかな組み合わせ', en: 'Refreshing combination of cola and orange' } },
      { name: { ja: 'オレンジフラワークーラー', en: 'Orange Flower Cooler' }, price: '¥700', description: { ja: 'オレンジとフローラルな香りのモクテル', en: 'Orange and floral scented mocktail' } },
      { name: { ja: 'ブラック & コーヒー', en: 'Black & Coffee' }, price: '¥700', description: { ja: 'コーヒーベースのモクテル', en: 'Coffee-based mocktail' } },
      { name: { ja: 'オレンジソニック', en: 'Orange Sonic' }, price: '¥700', description: { ja: 'オレンジの爽快なモクテル', en: 'Refreshing orange mocktail' } },
    ],
    alcohol: [
      // ビール
      { name: { ja: 'ハイネケン', en: 'Heineken' }, price: '¥900', description: { ja: 'オランダ産プレミアムビール', en: 'Premium Dutch beer' } },
      { name: { ja: 'コロナ', en: 'Corona' }, price: '¥900', description: { ja: 'メキシカンビールの代表格', en: 'Iconic Mexican beer' } },
      { name: { ja: 'レッドアイ', en: 'Red Eye' }, price: '¥900', description: { ja: 'ビールとトマトジュースのカクテル', en: 'Beer and tomato juice cocktail' } },
      { name: { ja: 'シャンディガフ', en: 'Shandy Gaff' }, price: '¥900', description: { ja: 'ビールとジンジャーエールの爽やかカクテル', en: 'Refreshing cocktail with beer and ginger ale' } },
      
      // ウイスキー
      { name: { ja: '角', en: 'Kaku' }, price: '¥800', description: { ja: 'サントリーの定番ウイスキー', en: 'Suntory classic whisky' } },
      { name: { ja: 'ラフロイグ', en: 'Laphroaig' }, price: '¥1,200', description: { ja: 'スコッチウイスキーの名品', en: 'Renowned Scotch whisky' } },
      { name: { ja: 'ワイルドターキー', en: 'Wild Turkey' }, price: '¥1,200', description: { ja: 'アメリカンウイスキーの代表', en: 'Representative American whiskey' } },
      { name: { ja: 'マッカラン', en: 'Macallan' }, price: '¥1,800', description: { ja: 'シェリー樽熟成の贅沢な味わい', en: 'Luxurious sherry cask aged flavor' } },
      { name: { ja: '山崎', en: 'Yamazaki' }, price: '¥1,600', description: { ja: 'サントリーの誇るジャパニーズウイスキー', en: 'Suntory\'s pride Japanese whisky' } },
      { name: { ja: '山崎12年', en: 'Yamazaki 12 Year' }, price: '¥2,800', description: { ja: '12年熟成の最高級ジャパニーズウイスキー', en: '12-year aged premium Japanese whisky' } },
      { name: { ja: '白州', en: 'Hakushu' }, price: '¥2,000', description: { ja: '森の恵みを感じるウイスキー', en: 'Whisky with forest essence' } },
      { name: { ja: '知多', en: 'Chita' }, price: '¥1,200', description: { ja: '穏やかで軽やかなグレーンウイスキー', en: 'Gentle and light grain whisky' } },
      
      // リキュール
      { name: { ja: 'ジン', en: 'Gin' }, price: '¥800', description: { ja: 'ジュニパーベリー香るスピリッツ', en: 'Juniper berry scented spirits' } },
      { name: { ja: 'ウォッカ', en: 'Vodka' }, price: '¥800', description: { ja: 'クリアでピュアなスピリッツ', en: 'Clear and pure spirits' } },
      { name: { ja: 'ラム（ダーク・ホワイト）', en: 'Rum (Dark・White)' }, price: '¥800', description: { ja: 'サトウキビ由来のスピリッツ', en: 'Sugarcane-derived spirits' } },
      { name: { ja: 'カシス', en: 'Cassis' }, price: '¥800', description: { ja: 'ブラックカラントリキュール', en: 'Blackcurrant liqueur' } },
      { name: { ja: 'ピーチ', en: 'Peach' }, price: '¥800', description: { ja: 'ピーチフレーバーリキュール', en: 'Peach flavored liqueur' } },
      { name: { ja: 'パッソア', en: 'Passoa' }, price: '¥800', description: { ja: 'パッションフルーツリキュール', en: 'Passion fruit liqueur' } },
      { name: { ja: 'マリブ', en: 'Malibu' }, price: '¥800', description: { ja: 'ココナッツリキュール', en: 'Coconut liqueur' } },
      { name: { ja: 'アマレット', en: 'Amaretto' }, price: '¥800', description: { ja: 'アーモンドフレーバーリキュール', en: 'Almond flavored liqueur' } },
      { name: { ja: 'レモンサワー', en: 'Lemon Sour' }, price: '¥800', description: { ja: 'レモン風味のサワー', en: 'Lemon flavored sour' } },
      { name: { ja: 'カルーア', en: 'Kahlua' }, price: '¥800', description: { ja: 'コーヒーリキュール', en: 'Coffee liqueur' } },
      
      // 日本酒・焼酎
      { name: { ja: '黒霧島（芋）', en: 'Kuro Kirishima (Sweet Potato)' }, price: '¥800', description: { ja: '芋焼酎の代表格', en: 'Representative sweet potato shochu' } },
      { name: { ja: '二階堂（麦）', en: 'Nikaido (Barley)' }, price: '¥800', description: { ja: '麦の風味豊かな焼酎', en: 'Rich barley flavored shochu' } },
      { name: { ja: '白岳しろ（米）', en: 'Hakutake Shiro (Rice)' }, price: '¥800', description: { ja: '米焼酎の上品な味わい', en: 'Elegant rice shochu taste' } },
      { name: { ja: '茉莉花（ジャスミン）', en: 'Jasmine Flower' }, price: '¥800', description: { ja: 'ジャスミン香る焼酎', en: 'Jasmine scented shochu' } },
      
      // ショット
      { name: { ja: 'テキーラ', en: 'Tequila' }, price: '¥800', description: { ja: 'メキシコ産のアガベスピリッツ', en: 'Mexican agave spirits' } },
      { name: { ja: 'イエーガー', en: 'Jägermeister' }, price: '¥800', description: { ja: 'ハーブリキュールの王様', en: 'King of herbal liqueurs' } },
      { name: { ja: 'コカレロ', en: 'Cocalero' }, price: '¥800', description: { ja: 'ボリビア産ハーブリキュール', en: 'Bolivian herbal liqueur' } },
      { name: { ja: 'コカボム', en: 'Coke Bomb' }, price: '¥800', description: { ja: 'エナジードリンクとのコンビネーション', en: 'Combination with energy drink' } },
      
      // シャンパン
      { name: { ja: 'アスティ', en: 'Asti' }, price: '¥11,000', description: { ja: 'イタリア産スパークリングワイン', en: 'Italian sparkling wine' } },
      { name: { ja: 'モエ・シャンドン', en: 'Moët & Chandon' }, price: '¥18,000', description: { ja: 'フランス産高級シャンパン', en: 'French premium champagne' } },
      { name: { ja: 'ヴーヴクリコ', en: 'Veuve Clicquot' }, price: '¥20,000', description: { ja: '黄ラベルで有名な高級シャンパン', en: 'Premium champagne famous for yellow label' } },
      { name: { ja: 'ベルエポック', en: 'Belle Époque' }, price: '¥50,000', description: { ja: 'ペリエ・ジュエの最高級キュヴェ', en: 'Perrier-Jouët\'s finest cuvée' } },
      { name: { ja: 'クリスタル', en: 'Cristal' }, price: '¥90,000', description: { ja: 'ルイ・ロデレールの最高級品', en: 'Louis Roederer\'s finest product' } },
      { name: { ja: 'アルマンド', en: 'Armand de Brignac' }, price: '¥150,000', description: { ja: '金ボトルで有名な超高級シャンパン', en: 'Ultra-premium champagne famous for gold bottle' } },
    ],
    food: [
      { name: { ja: 'ガトーショコラ', en: 'Chocolate Cake' }, price: '¥500', description: { ja: 'オーガニックチョコを使い甘さ控えめな口溶け良い味わい', en: 'Made with organic chocolate, mildly sweet with smooth texture' } },
      { name: { ja: 'エッグタルト', en: 'Egg Tart' }, price: '¥500', description: { ja: '宮若市の地卵黄を使用した濃厚な味わい', en: 'Rich flavor using local egg yolks from Miyawaka City' } },
      { name: { ja: 'セミドライジャーキー', en: 'Semi-Dry Jerky' }, price: '¥700', description: { ja: 'ＯＧビーフを使用したしっとりとした食感', en: 'Moist texture using OG beef' } },
      { name: { ja: '発酵レーズンバター', en: 'Fermented Raisin Butter' }, price: '¥500', description: { ja: '香り豊かでさっぱりとした味わいでお酒との相性抜群', en: 'Aromatic and refreshing taste, perfect with alcohol' } },
    ]
  };

  const categories = t.menu.categories;




  

  return (
    <section id="menu" className="menu" style={{background: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(/シーシャ台煙.jpg)`, backgroundSize: '200%', backgroundPosition: 'center top', backgroundRepeat: 'no-repeat'}}>
      <div className="container">
        <h2 className="section-title">{t.menu.title}</h2>
      
        <div className="menu-categories">
          {Object.entries(categories).map(([key, label]) => (
            <button
              key={key}
              className={`category-btn ${activeCategory === key ? 'active' : ''}`}
              onClick={() => setActiveCategory(key)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="menu-grid">
          {menuItems[activeCategory].map((item, index) => (
            <div key={index} className="menu-item">
              <div className="menu-item-header">
                <h3 className="item-name">{item.name[language] || item.name}</h3>
                <span className="item-price">{item.price}</span>
              </div>
              <p className="item-description">{item.description[language] || item.description}</p>
            </div>
          ))}
        </div>

        <div className="menu-note">
          {t.menu.notes.map((note, index) => (
            <p key={index}>{note}</p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;