import { Button } from '@/components/ui/button';

export default function Partnership() {
  return (
    <section className="py-20 px-8 bg-background">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center text-foreground">
          병원·보험·지자체와의 파트너를 찾고 있습니다
        </h2>
        
        <div className="prose prose-lg max-w-none mb-10 text-center space-y-6">
          <p className="text-xl text-muted-foreground leading-relaxed">
            DogNoseID는 반려동물 비문 인식 기술을<br />
            병원, 보험사, 반려동물 서비스, 지자체와 함께 실증하고 싶습니다.
          </p>
          
          <div className="bg-muted p-8 rounded-lg text-left space-y-4">
            <p className="text-lg font-semibold text-foreground">제공 가능한 서비스:</p>
            <ul className="space-y-2 text-muted-foreground">
              <li>• PoC / 파일럿 프로젝트</li>
              <li>• API 연동 / SDK 제공</li>
              <li>• 맞춤형 비문 인식 솔루션 도입</li>
            </ul>
          </div>

          <p className="text-xl text-muted-foreground leading-relaxed">
            어떤 형태든 편하게 먼저 연락 주세요.<br />
            반려동물 개체 식별의 새로운 표준을 함께 만들 파트너를 기다리고 있습니다.
          </p>
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-10 py-6 h-auto font-semibold"
          >
            파트너십/도입 문의하기
          </Button>
        </div>
      </div>
    </section>
  );
}

