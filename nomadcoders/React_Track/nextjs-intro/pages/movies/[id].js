import { useRouter } from "next/router";

export default function Detail() {
    const router = useRouter();
    console.log("이걸 네번이나??");
    console.log(router);
    return "detail";
}