# Color Palette Generator (Renk Paleti Oluşturucu)

React ve shadcn/ui bileşenleriyle oluşturulmuş modern, etkileşimli bir renk paleti oluşturucu. Uyumlu renk kombinasyonları oluşturun, favori paletlerinizi kaydedin ve projeleriniz için dışa aktarın.

## Özellikler

- **Çoklu Renk Uyum Kuralları**
  - Rastgele renk oluşturma
  - Tamamlayıcı renkler
  - Benzer renkler
  - Üçlü renkler

- **Gelişmiş Renk Yönetimi**
  - Tek tıkla yeni renk paletleri oluşturma
  - On altılı formatta özel renk girişi
  - Renkleri tek tıkla panoya kopyalama
  - Palet geçmişi için Geri Al/Yeniden Yap işlevselliği

- **Palet Düzenleme**
  - Favori paletleri kaydetme
  - Tüm paletleri JSON formatında dışa aktarma
  - Koyu/Açık mod geçişi
  - Görsel renk önizlemesi

## Kurulum

1. Öncelikle gerekli bağımlılıklara sahip olduğunuzdan emin olun:

```bash
npm install react lucide-react
```

2. Gerekli shadcn/ui bileşenlerini kurun:

```bash
npx shadcn-ui@latest add alert select
```

3. Bileşeni projenize ekleyin:

```bash
# ColorPaletteGenerator.tsx dosyasını bileşenler dizininize kopyalayın
```

## Kullanım

```jsx
import ColorPaletteGenerator from './components/ColorPaletteGenerator';

function App() {
  return (
    <div>
      <ColorPaletteGenerator />
    </div>
  );
}
```

## Bileşen Yapısı

Oluşturucu birkaç temel özellikten oluşur:

### Renk Oluşturma
- Uyumlu renk kombinasyonları oluşturmak için HSL renk alanını kullanır
- Çoklu renk uyum kurallarını destekler (tamamlayıcı, benzer, üçlü)
- Belirli bir kural seçilmediğinde rastgele renkler oluşturur

### Renk Yönetimi
- Hex ve HSL renk formatları arasında dönüşüm yapar
- Oluşturulan paletleri kaydeder
- Paletleri JSON formatında dışa aktarır
- Tek tek renkleri panoya kopyalar

### Kullanıcı Arayüzü
- Renk gösterimi için duyarlı ızgara düzeni
- Palet oluşturma için etkileşimli kontroller
- Koyu/Açık mod geçişi
- Geri Al/Yeniden Yap işlevselliği
- Özel renk girişi desteği

## Özellikler ve Yapılandırma

Bileşen herhangi bir özellik gerektirmez ve kendi durumunu dahili olarak yönetir. Ancak, gerekirse kendi durum yönetiminizle sarabilirsiniz.

## Stil

Bileşen, stil için Tailwind CSS kullanır ve tamamen duyarlıdır. Koyu/açık mod geçişi, tüm bileşeni etkiler ve renk kontrastını doğru bir şekilde yönetir.

## Örnekler

### Temel Uygulama
```jsx
<ColorPaletteGenerator />
```

### Özel Renk Oluşturma
Kullanıcılar, hex formatında (#RRGGBB) özel renkler girerek bu renge dayalı uyumlu paletler oluşturabilir.

### Kaydetme ve Dışa Aktarma
- Favori kombinasyonlarınızı saklamak için "Paleti Kaydet" düğmesine tıklayın
- Tüm paletleri JSON dosyası olarak indirmek için "Paletleri Dışa Aktar"ı kullanın

## Katkıda Bulunma

Katkılar memnuniyetle karşılanır! Lütfen bir Çekme İsteği göndermekten çekinmeyin.

## Lisans

MIT

## Katkıda Bulunanlar

Şunlarla oluşturulmuştur:
- React
- shadcn/ui bileşenleri
- Lucide React İkonları
- Tailwind CSS
