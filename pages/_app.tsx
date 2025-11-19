import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import LoginModal from "@/components/modals/LoginModal";
import RegisterModal from "@/components/modals/RegisterModal";
import NewTaskModal from "@/components/modals/NewTaskModal";
import EditModal from "@/components/modals/EditModal";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <LoginModal />
      <RegisterModal />
      <NewTaskModal />
      <EditModal />
      <Component {...pageProps} />
    </SessionProvider>
  )
}
