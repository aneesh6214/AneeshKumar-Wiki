import Link from "next/link"

interface ProfileData {
  born?: string
  occupation?: string
  education?: string
  knownFor?: string
  website?: string
  photoCaption?: string
}

interface ProfileInfoProps {
  data: ProfileData
  name: string
}

export default function ProfileInfo({ data, name }: ProfileInfoProps) {
  return (
    <div className="w-full lg:w-1/3 lg:max-w-80">
      <div className="border border-gray-300 bg-gray-50 p-4 mb-6">
        <div className="text-center mb-4">
          <h3 className="font-bold text-lg mb-2">{name}</h3>
          <img
            src="/profile-photo.png"
            alt={name}
            className="w-full h-48 sm:h-64 object-cover mb-2 rounded"
          />
          <div className="text-sm text-gray-600">{data.photoCaption || "TODO: Add photo caption"}</div>
        </div>

        <table className="w-full text-sm">
          <tbody>
            <tr className="border-t border-gray-300">
              <td className="font-bold py-2 pr-2 align-top">Born</td>
              <td className="py-2">
                {data.born || "TODO: Add birth information"}
              </td>
            </tr>
            <tr className="border-t border-gray-300">
              <td className="font-bold py-2 pr-2 align-top">Occupation</td>
              <td className="py-2">{data.occupation || "Computer science student, AI researcher"}</td>
            </tr>
            <tr className="border-t border-gray-300">
              <td className="font-bold py-2 pr-2 align-top">Education</td>
              <td className="py-2">{data.education || "TODO: Add educational background"}</td>
            </tr>
            <tr className="border-t border-gray-300">
              <td className="font-bold py-2 pr-2 align-top">Known for</td>
              <td className="py-2">{data.knownFor || "AI interpretability research, cognitive emergence studies, theoretical AI"}</td>
            </tr>
            <tr className="border-t border-gray-300">
              <td className="font-bold py-2 pr-2 align-top">Website</td>
              <td className="py-2">
                {data.website ? (
                  <Link href={data.website} className="text-blue-600 hover:underline">
                    {data.website}
                  </Link>
                ) : (
                  "TODO: Add website URL"
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}