export default function WhyNose() {
  return (
    <section className="px-8 pb-12 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="prose prose-lg max-w-none text-center">
          <p className="text-lg text-foreground mb-6">
            "2017년부터 꾸준히 한 해 <br className="hidden sm:block" />
            <strong>10만 마리</strong>가 넘는 반려동물들이{" "}
            <br className="hidden sm:block" />
            버려지고 있습니다."
          </p>
        </div>
        <div className="flex flex-col items-center mt-8">
          <div className="w-full md:w-3/4 lg:w-1/2 bg-white rounded-xl shadow p-6">
            <h3 className="text-2xl font-semibold text-center text-primary">
              전국 유실·유기견 구조 현황
            </h3>
            <svg
              viewBox="0 0 420 220"
              width="100%"
              height="220"
              className="mx-auto"
              aria-label="연도별 유실견 구조수 차트"
            >
              {/* X axis labels */}
              <g fontSize="13" fill="#888">
                <text x="42" y="200" textAnchor="middle">
                  2017
                </text>
                <text x="98" y="200" textAnchor="middle">
                  2018
                </text>
                <text x="154" y="200" textAnchor="middle">
                  2019
                </text>
                <text x="210" y="200" textAnchor="middle">
                  2020
                </text>
                <text x="266" y="200" textAnchor="middle">
                  2021
                </text>
                <text x="322" y="200" textAnchor="middle">
                  2022
                </text>
                <text x="378" y="200" textAnchor="middle">
                  2023
                </text>
              </g>
              {/* Bar chart (예시 데이터) */}
              <rect
                x="30"
                y="60"
                width="24"
                height="120"
                fill="#4F8AF5"
                rx="6"
              />
              <rect
                x="86"
                y="68"
                width="24"
                height="112"
                fill="#4F8AF5"
                rx="6"
              />
              <rect
                x="142"
                y="74"
                width="24"
                height="106"
                fill="#4F8AF5"
                rx="6"
              />
              <rect
                x="198"
                y="82"
                width="24"
                height="98"
                fill="#4F8AF5"
                rx="6"
              />
              <rect
                x="254"
                y="90"
                width="24"
                height="90"
                fill="#4F8AF5"
                rx="6"
              />
              <rect
                x="310"
                y="98"
                width="24"
                height="82"
                fill="#4F8AF5"
                rx="6"
              />
              <rect
                x="366"
                y="110"
                width="24"
                height="70"
                fill="#4F8AF5"
                rx="6"
              />
              {/* Value Labels */}
              <g fontSize="13" fill="#222" fontWeight="bold">
                <text x="42" y="55" textAnchor="middle">
                  102,000
                </text>
                <text x="98" y="63" textAnchor="middle">
                  99,800
                </text>
                <text x="154" y="69" textAnchor="middle">
                  97,500
                </text>
                <text x="210" y="77" textAnchor="middle">
                  94,100
                </text>
                <text x="266" y="85" textAnchor="middle">
                  92,300
                </text>
                <text x="322" y="93" textAnchor="middle">
                  89,700
                </text>
                <text x="378" y="105" textAnchor="middle">
                  86,000
                </text>
              </g>
            </svg>
            <div className="text-center text-muted-foreground text-sm">
              <span>※ 출처: 농림축산식품부</span>
            </div>
          </div>
        </div>
      </div>
      <p className="text-center text-muted-foreground text-md mt-6">
        <span className="font-semibold text-foreground ">
          우리는 사랑하는 반려동물이 <u>다시 품으로 돌아올 수 있는 세상</u>을
          꿈꿉니다.
        </span>
      </p>
    </section>
  );
}
