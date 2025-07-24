import { handleChatToTags, fetchImagesByTagsOrKeywords } from '@/lib/logic';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const { question } = body;

  const { OPENAI_API_KEY, MICROCMS_API_KEY, MICROCMS_SERVICE_DOMAIN } = process.env;

  if (!OPENAI_API_KEY || !MICROCMS_API_KEY || !MICROCMS_SERVICE_DOMAIN) {
    return new NextResponse('環境変数が不足しています', { status: 500 });
  }

  try {
    const tags = await handleChatToTags(question, { OPENAI_API_KEY });

    const images = await fetchImagesByTagsOrKeywords(tags, question, {
      MICROCMS_API_KEY,
      MICROCMS_SERVICE_DOMAIN,
    });

    return NextResponse.json({
      reply: tags.map(t => t.label).join('・') + ' に関連する画像を検索しました！',
      images,
    });
  } catch (e) {
    console.error('[API Error]', e);
    return new NextResponse('サーバーエラー', { status: 500 });
  }
}