import SectionHeading from "@/components/admin/SectionHeading";
import WikiFigure from "@/components/admin/WikiFigure";
import CategoryDonut from "@/components/admin/charts/CategoryDonut";
import type { SlicePoint } from "@/lib/admin/queries";

interface Props {
  devices: SlicePoint[];
  browsers: SlicePoint[];
  os: SlicePoint[];
}

export default function ClientEnvSection({ devices, browsers, os }: Props) {
  return (
    <>
      <SectionHeading id="client-environment" num="5">
        Client environment
      </SectionHeading>

      <SectionHeading id="device-browser-os" num="5.1" level={3}>
        Device, browser, and operating system
      </SectionHeading>
      <p className="leading-7 mb-4">
        User-agent strings parsed server-side in middleware.
      </p>
      {devices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <WikiFigure number={4} caption="Device type breakdown.">
            <CategoryDonut data={devices} />
          </WikiFigure>
          <WikiFigure number={5} caption="Browser share.">
            <CategoryDonut data={browsers} />
          </WikiFigure>
          <WikiFigure number={6} caption="Operating system share.">
            <CategoryDonut data={os} />
          </WikiFigure>
        </div>
      ) : (
        <p className="italic text-gray-600 my-4">No data yet.</p>
      )}
    </>
  );
}
