import { Card, CardContent } from '@/components/ui/card';

export default function TargetAudience() {
  const targets = [
    {
      icon: '🐕',
      title: '반려견 보호자',
      description: '우리 강아지가 유기·실종되더라도, 사진 한 장으로 다시 찾을 수 있길 바라는 분'
    },
    {
      icon: '🏥',
      title: '동물병원·클리닉',
      description: '"이 강아지가 정말 이 차트의 강아지가 맞나?" 진료 기록 관리의 정확도가 중요한 병원'
    },
    {
      icon: '🧾',
      title: '펫보험사·관련 서비스 기업',
      description: '보험 사기·중복 청구를 줄이고 정교한 리스크 관리를 하고 싶은 보험사/플랫폼'
    }
  ];

  return (
    <section className="py-20 px-8 bg-background">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-foreground">
          DogNoseID가 특히 필요한 사람들
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {targets.map((target, index) => (
            <Card key={index} className="border-2 hover:shadow-xl transition-all hover:-translate-y-1">
              <CardContent className="p-8 text-center">
                <div className="text-6xl mb-6">{target.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">{target.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{target.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

