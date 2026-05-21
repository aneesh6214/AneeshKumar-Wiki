const bannerItems = Array.from({ length: 12 }, (_, index) => index);

function BannerTrack() {
  return (
    <div className="flex shrink-0 items-center">
      {bannerItems.map((item) => (
        <span key={item} className="flex items-center whitespace-nowrap">
          <span>Aneesh Kumar Rocks</span>
          <span className="px-3 text-gray-500">·</span>
        </span>
      ))}
    </div>
  );
}

export default function TopBanner() {
  return (
    <div
      className="fixed inset-x-0 top-0 z-50 h-8 overflow-hidden border-b border-[#a2a9b1] bg-[#f8f9fa] font-serif text-[13px] leading-8 text-[#202122]"
      aria-hidden="true"
    >
      <div className="kumarpedia-marquee flex w-max">
        <BannerTrack />
        <BannerTrack />
      </div>
    </div>
  );
}
