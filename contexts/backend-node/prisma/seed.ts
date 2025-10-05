import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 座席データを作成
  const seats = [
    {
      name: 'VIP個室A',
      type: 'VIP',
      capacity: 4,
      description: '豪華な個室でゆったりとお楽しみいただけます',
      isActive: true,
      hourlyRate: 3000,
    },
    {
      name: 'VIP個室B',
      type: 'VIP',
      capacity: 6,
      description: '大人数でのご利用に最適な広々とした個室',
      isActive: true,
      hourlyRate: 4000,
    },
    {
      name: 'カウンター席1',
      type: 'カウンター',
      capacity: 2,
      description: 'バーカウンター風の落ち着いた雰囲気',
      isActive: true,
      hourlyRate: 2000,
    },
    {
      name: 'カウンター席2',
      type: 'カウンター',
      capacity: 2,
      description: 'バーカウンター風の落ち着いた雰囲気',
      isActive: true,
      hourlyRate: 2000,
    },
    {
      name: 'テーブル席A',
      type: 'テーブル',
      capacity: 4,
      description: '友人とのリラックスした時間に',
      isActive: true,
      hourlyRate: 2500,
    },
    {
      name: 'テーブル席B',
      type: 'テーブル',
      capacity: 4,
      description: '友人とのリラックスした時間に',
      isActive: true,
      hourlyRate: 2500,
    },
  ];

  for (const seat of seats) {
    await prisma.seat.create({
      data: seat,
    });
  }

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
