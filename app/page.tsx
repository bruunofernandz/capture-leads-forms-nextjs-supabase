'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { useMask } from '@react-input/mask';
import { GalleryVerticalEnd, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { ZodIssue } from 'zod';
import { createUserInfo } from './actions';

export default function Home() {
  const inputPhoneRef = useMask({
    mask: '(__) _____-____',
    replacement: {
      _: /\d/,
    },
  });
  const [createdUser, setCreatedUser] = useState(false);

  const [loading, setLoading] = useState(false);
  const [createUserInfoError, setCreateUserInfoError] = useState<
    string | undefined
  >(undefined);
  const [zodIssues, setZodIssues] = useState<ZodIssue[] | undefined>(undefined);

  const handleCreateUserInfo = async (formData: FormData) => {
    console.log('user_name', formData.get('user_name'));
    console.log('user_email', formData.get('user_email'));
    console.log('phone_number', formData.get('phone_number'));
    setLoading(true);

    const { isCreatedUser, error, zodIssues } = await createUserInfo(formData);

    if (error) {
      console.log('ERROR!');

      setCreateUserInfoError(error);

      setLoading(false);
    }

    if (zodIssues) {
      setZodIssues(zodIssues);

      if (zodIssues.length > 0) {
        console.log('ZOD ERROR!');

        zodIssues.forEach((issue) => {
          setZodIssues([issue]);
        });
        setLoading(false);
        return;
      }
    }

    if (!error) {
      console.log('isCreatedAccount', isCreatedUser);
      setCreatedUser(isCreatedUser);

      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-[#09090ad9]  flex flex-col justify-items-center items-center font-[family-name:var(--font-geist-sans)]">
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <a
            href="#"
            className="flex items-center gap-2 self-center font-medium text-white"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Dice Forge Games.
          </a>
          <div className={cn('flex flex-col gap-6')}>
            {createdUser && (
              <div className="text-center text-gray-300">
                Aproveite seu ebook grátis!🎉
                <a href="https://imhmolmrjfocnrvlhitq.supabase.co/storage/v1/object/public/freebook//Guia-Completo-Como-Rodar-a-Unreal-Engine-5-em-PCs-Modestos%20(1).pdf">
                  <Button
                    type="submit"
                    className="w-full bg-[#9059FF] hover:bg-[#9059ff98] mt-8 cursor-pointer h-12"
                    formAction={handleCreateUserInfo}
                  >
                    BAIXAR EBOOK
                  </Button>
                </a>
              </div>
            )}

            {!createdUser && (
              <Card className="bg-zinc-900 overflow-hidden border-zinc-700 bg-origin-border rounded-[10px]">
                <CardHeader className="text-center">
                  <CardTitle className="text-lg text-left text-[#9059FF]">
                    Garanta seu ebook gratuíto!
                  </CardTitle>
                  <CardDescription className="text-left text-gray-300">
                    Preencha o formulário para ter acesso ao material de apoio.
                  </CardDescription>

                  {zodIssues && (
                    <Label htmlFor="ErrorForm" className="text-red-500">
                      {zodIssues?.map((i) => i.message)}
                    </Label>
                  )}

                  {createUserInfoError && (
                    <Label className="text-red-500" htmlFor="ErrorAPI">
                      {createUserInfoError}
                    </Label>
                  )}
                </CardHeader>
                <CardContent>
                  <form>
                    <div className="grid gap-6">
                      <div className="grid gap-6">
                        <div className="grid gap-3">
                          <Label htmlFor="user_name" className="text-gray-50">
                            Seu nome completo
                          </Label>
                          <Input
                            id="user_name"
                            name="user_name"
                            type="text"
                            placeholder="Dice Forge Games da Silva"
                            className="border-zinc-700 text-white"
                            required
                          />
                        </div>

                        <div className="grid gap-3">
                          <Label htmlFor="user_email" className="text-gray-50">
                            Email
                          </Label>
                          <Input
                            id="user_email"
                            name="user_email"
                            type="email"
                            placeholder="m@example.com"
                            className="border-zinc-700 text-white"
                            required
                          />
                        </div>
                        <div className="grid gap-3">
                          <div className="flex items-center">
                            <Label
                              htmlFor="phone_number"
                              className="text-gray-50"
                            >
                              Seu número de Whatsapp
                            </Label>
                          </div>
                          <Input
                            id="phone"
                            name="phoneNumber"
                            type="text"
                            placeholder="(19) 98978-6785"
                            className="border-zinc-700 text-white"
                            ref={inputPhoneRef}
                            defaultValue=""
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-[#9059FF] hover:bg-[#9059ff98] mt-8 cursor-pointer h-12"
                      formAction={handleCreateUserInfo}
                    >
                      {loading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <p>GARANTIR EBOOK GRATUITO</p>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {!createdUser && (
              <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                <Dialog>
                  <DialogTrigger>
                    By clicking continue, you agree to our{' '}
                    <a href="#">Terms of Service</a> and{' '}
                    <a href="#">Privacy Policy</a>.
                  </DialogTrigger>

                  <DialogContent className=" bg-zinc-900 overflow-hidden border-none bg-origin-border rounded-[10px]">
                    <DialogTitle></DialogTitle>
                    <div className="h-[350px] p-6 bg-zinc-800 rounded-lg shadow-lg overflow-scroll mt-4">
                      <h1 className="text-3xl font-bold text-left text-white mb-6">
                        Termos e Condições para Captação de Leads
                      </h1>

                      <section className="mb-6">
                        <h2 className="text-xl font-semibold text-white">
                          1. Aceitação dos Termos
                        </h2>
                        <p className="text-gray-400 mt-2">
                          Ao fornecer seus dados pessoais por meio de nossos
                          formulários, você concorda com os termos e condições
                          estabelecidos neste documento. Se não concordar,
                          pedimos que não forneça suas informações.
                        </p>
                      </section>

                      <section className="mb-6">
                        <h2 className="text-xl font-semibold text-white">
                          2. Finalidade da Coleta de Dados
                        </h2>
                        <p className="text-gray-400 mt-2">
                          Os dados coletados serão utilizados para fins de
                          comunicação, marketing e envio de informações
                          relacionadas aos nossos produtos e serviços.
                        </p>
                      </section>

                      <section className="mb-6">
                        <h2 className="text-xl font-semibold text-white">
                          3. Compartilhamento de Informações
                        </h2>
                        <p className="text-gray-400 mt-2">
                          Seus dados não serão vendidos, alugados ou
                          compartilhados com terceiros sem seu consentimento,
                          exceto quando exigido por lei ou necessário para
                          execução de serviços contratados.
                        </p>
                      </section>

                      <h1 className="text-3xl font-bold text-center text-white mt-10 mb-6">
                        Política de Privacidade para Captação de Leads
                      </h1>

                      <section className="mb-6">
                        <h2 className="text-xl font-semibold text-white">
                          1. Informações Coletadas
                        </h2>
                        <p className="text-gray-400 mt-2">
                          Coletamos informações pessoais, como nome, e-mail e
                          telefone, fornecidas voluntariamente pelo usuário
                          através de nossos formulários.
                        </p>
                      </section>

                      <section className="mb-6">
                        <h2 className="text-xl font-semibold text-white">
                          2. Uso das Informações
                        </h2>
                        <p className="text-gray-400 mt-2">
                          Os dados coletados serão utilizados para enviar
                          comunicações, promoções, newsletters e informações
                          sobre nossos produtos e serviços.
                        </p>
                      </section>

                      <section className="mb-6">
                        <h2 className="text-xl font-semibold text-white">
                          6. Contato
                        </h2>
                        <p className="text-gray-400 mt-2">
                          Para dúvidas ou solicitações relacionadas à
                          privacidade de seus dados, entre em contato conosco
                          através do e-mail:
                          <a
                            href="mailto:bruunofernandz9@gmail.com"
                            className="text-blue-600 hover:underline"
                          >
                            {' '}
                            bruunofernandz9@gmail.com
                          </a>
                          .
                        </p>
                      </section>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
