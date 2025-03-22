import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('flex flex-col gap-6 bg-[#09090ad9]', className)}
      {...props}
    >
      <Card className="bg-zinc-900 overflow-hidden border-zinc-700 bg-origin-border rounded-[10px]">
        <CardHeader className="text-center">
          <CardTitle className="text-lg text-left text-[#9059FF]">
            Garanta seu ebook gratuíto!
          </CardTitle>
          <CardDescription className="text-left text-gray-300">
            Preencha o formulário para ter acesso ao material de apoio.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email" className="text-gray-50">
                    Seu nome completo
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Dice Forge Games da Silva"
                    required
                    className="border-zinc-700"
                  />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="email" className="text-gray-50">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    className="border-zinc-700"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password" className="text-gray-50">
                      Seu número de Whatsapp
                    </Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="(19) 98978-6785"
                    className="border-zinc-700"
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-[#9059FF]">
                  GARANTIR EBOOK GRATUÍTO
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{' '}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
