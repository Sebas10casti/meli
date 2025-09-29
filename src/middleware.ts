import { getLocale, hasPathnameLocale } from "@/utils/i18n";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log("pathname", request.nextUrl.pathname);

  const hasLocal = hasPathnameLocale(pathname);
  if (hasLocal) {
    // Si ya tiene locale, verificar si es la página principal y redirigir a start-test
    if (pathname === `/${pathname.split('/')[1]}` || pathname === `/${pathname.split('/')[1]}/`) {
      const locale = pathname.split('/')[1];
      return NextResponse.redirect(new URL(`/${locale}/start-test`, request.url));
    }
    return;
  }

  const locale = getLocale({
    "accept-language": request.headers.get("Accept-Language") || "",
  });
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);

  /*
  const { hostname } = request.nextUrl;
  const locale = getLocaleFromDomain(hostname);

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(url);
  */
}

/*
function getLocaleFromDomain(hostname: string): string {
  const domainLocaleMap: Record<string, string> = {
    "mercadolibre.com.ar": "es",
    "mercadolivre.com.br": "pt",
  };
  return domainLocaleMap[hostname] || "es";
}
*/

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, favicon)
    "/((?!_next|api|favicon.ico).*)",
  ],
};