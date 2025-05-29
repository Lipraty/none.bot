import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function Page() {
  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center">
          <Link
            href="/"
            className="flex items-center space-x-2 text-lg font-semibold text-primary transition-colors hover:text-primary/80"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>返回首页</span>
          </Link>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-primary mb-2">
            None.Bot 子域名使用服务条款
          </h1>
          <p className="text-lg text-muted-foreground">
            欢迎使用 none.bot 子域名服务；该服务由 Lipraty 提供
            <br />
            请仔细阅读以下条款，以确保您的使用符合要求
          </p>
        </header>
        <hr className="my-8 border-border" />

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-primary mb-4">1. 服务条款</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li>1.1 您必须遵守中华人民共和国的法律法规；</li>
            <li>1.2 您必须遵守本服务条款；</li>
            <li>1.3 您必须尊重 NoneBot 及其附属产物的版权声明；</li>
            <li>
              1.4 仅提供子域名解析，不提供任何其他服务；
              <ul className="ml-6 mt-1 space-y-1 text-sm">
                <li>1.4.1 子域名解析服务仅提供 A、AAAA、CNAME 记录解析；</li>
                <li>
                  1.4.2
                  子域名所指向内容必须是开源聊天机器人框架相关项目有关联的生态的页面、API等；
                </li>
                <li>
                  1.4.3 子域名不得与官方保留字、官方插件和非私域市场插件同名；
                </li>
                <li>
                  1.4.4 该域名未进行 IPC 备案，不保证解析到中国大陆境内的服务商 IP 地址时可能的阻断。
                </li>
              </ul>
            </li>
            <li>1.5 不提供任何 SLA 保证；</li>
            <li>1.6 不提供任何数据备份服务。</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-primary mb-4">2. 免责声明</h2>
          <ul className="list-inside space-y-2 text-muted-foreground">
            <li>2.1 不对您的任何使用行为及造成的后果负责；</li>
            <li>2.2 不对您的数据安全负责；</li>
            <li>2.3 不对您的服务器安全负责；</li>
            <li>2.4 不对不可抗力因素造成的影响负责；包括但不限于自然灾害、战争、政府行为等。</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-primary mb-4">3. 服务变更</h2>
          <p className="text-muted-foreground">
            3.1 有权随时变更服务内容与本服务条款，不另行通知。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-primary mb-4">4. 服务终止</h2>
          <p className="text-muted-foreground mb-2">
            4.1 当您出现以下情况，我们有权随时终止服务：
          </p>
          <ul className="ml-6 mt-1 space-y-1 text-sm text-muted-foreground">
            <li>4.1.1 违反本服务条款时；</li>
            <li>4.1.2 违反中国大陆法律法规或所在国家法律法规时；</li>
            <li>4.1.3 违反其他相关服务条款时；</li>
            <li>4.1.4 行为影响到 NoneBot Team 及服务正常运营时；</li>
            <li>4.1.5 行为影响到其他使用者的正常使用时。</li>
          </ul>
        </section>

        <hr className="my-8 border-border" />

        <footer className="text-center text-sm text-muted-foreground">
          <p>本服务条款最终解释权归 Lipraty 所有，None.Bot 与 NoneBot 官方没有从属关系，本项目非 NoneBot 官方项目。</p>
          <p>本服务条款最后更新于 2023 年 12 月 23 日</p>
        </footer>
      </main>
    </>
  );
}
