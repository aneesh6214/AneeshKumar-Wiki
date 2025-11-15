import React from "react";
import { JSONContent } from "@/lib/json-content";

export const contactContent: JSONContent = {
  title: "Contact",
  subtitle: "Get in Touch",
  description: "Contact information and ways to connect",
  url: "/contact",
  sections: [
    {
      title: "",
      description: (
        <>
          <p className="mb-3 text-sm text-gray-700">
          The contact information below provides ways to reach Aneesh Kumar for academic inquiries, research collaborations, and professional communication.
          </p>
          <dl className="space-y-3">
            <div>
              <dt className="font-semibold text-sm text-gray-900">Email</dt>
              <dd>
                <a
                  href="mailto:aneesh.kumar6214@gmail.com"
                  className="text-blue-600 hover:underline"
                >
                  aneesh.kumar6214@gmail.com
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-sm text-gray-900">LinkedIn</dt>
              <dd>
                <a
                  href="https://linkedin.com/in/aneesh6214"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  linkedin.com/in/aneesh6214
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-sm text-gray-900">GitHub</dt>
              <dd>
                <a
                  href="https://github.com/aneesh6214"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  github.com/aneesh6214
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-sm text-gray-900">Twitter</dt>
              <dd>
                <a
                  href="https://twitter.com/aneesh6214"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  @aneesh6214
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-sm text-gray-900">YouTube</dt>
              <dd>
                <a
                  href="https://www.youtube.com/@Aneesh6214"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  @Aneesh6214
                </a>
              </dd>
            </div>
          </dl>
        </>
      ),
    },
  ],
};
