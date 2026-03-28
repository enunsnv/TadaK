import { NextResponse } from "next/server";
import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export async function GET() {
  try {
    const db = await notion.databases.retrieve({
      database_id: process.env.NOTION_DATABASE_ID,
    });

    const dataSourceId = db.data_sources?.[0]?.id;

    if (!dataSourceId) {
      throw new Error("data_source_id 없음");
    }

    const response = await notion.dataSources.query({
      data_source_id: dataSourceId,
    });

    const words = response.results.map((item) => ({
      ko: item.properties["한국어"]?.title?.[0]?.plain_text || "",
      jp: item.properties["일본어"]?.rich_text?.[0]?.plain_text || "",
    }));

    return NextResponse.json(words);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
