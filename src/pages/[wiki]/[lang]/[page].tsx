import { getPage, type WikiParams } from "@/services";
import { GetServerSideProps } from "next";
import { type FC } from "react";

interface PageProps {
  content: string;
  status?: "success" | "failed";
  error?: unknown;
}

const Page: FC<PageProps> = ({ content, status }) => {
  return <div>{content}</div>;
};

export const getServerSideProps: GetServerSideProps<
  Partial<WikiParams & PageProps>
> = async (context) => {
  const { wiki, lang, page } = context.params ?? {};
  try {
    const content = await getPage({
      wiki: wiki as string,
      lang: lang as string,
      page: page as string,
    });
    return {
      props: {
        content,
        status: "success",
      },
    };
  } catch (error) {
    return {
      props: {
        content: "",
        status: "success",
        error,
      },
    };
  }
};
