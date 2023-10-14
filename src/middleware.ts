import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	const pathname = request.nextUrl.pathname;

	// if (pathname.startsWith(`/cdn/`)) {
	// 	return NextResponse.next();
	// }
	if (pathname == `/super`) {
		return NextResponse.redirect(
			new URL(`/super/users/list/`, request.url)
		);
	}
	if (pathname == `/super/users`) {
		return NextResponse.redirect(
			new URL(`/super/users/list/`, request.url)
		);
	}
	if (pathname == `/super/documents`) {
		return NextResponse.redirect(
			new URL(`/super/documents/pending/`, request.url)
		);
	}
	if (pathname == `/staff`) {
		return NextResponse.redirect(
			new URL(`/staff/documents/list/`, request.url)
		);
	}
	if (pathname == `/staff/documents`) {
		return NextResponse.redirect(
			new URL(`/staff/documents/list/`, request.url)
		);
	}

	// if (pathname == `/id/super-admin/users`) {
	// 	return NextResponse.redirect(new URL(`/id/super-admin/users/list`, request.url));
	// }

	// if (pathname == `/id/super-admin/programs`) {
	// 	return NextResponse.redirect(
	// 		new URL(`/id/super-admin/programs/list`, request.url)
	// 	);
	// }

	// if (pathname == `/id/admin`) {
	// 	return NextResponse.redirect(new URL(`/id/admin/users/`, request.url));
	// }

	// if (pathname == `/id/admin/users`) {
	// 	return NextResponse.redirect(new URL(`/id/admin/users/list`, request.url));
	// }

	// if (pathname == `/id/admin/programs`) {
	// 	return NextResponse.redirect(
	// 		new URL(`/id/admin/programs/list`, request.url)
	// 	);
	// }

	// if (pathname == `/id/admin/laboratories`) {
	// 	return NextResponse.redirect(
	// 		new URL(`/id/admin/laboratories/list`, request.url)
	// 	);
	// }

	// if (pathname == `/id/super-admin/postgraduate`) {
	// 	return NextResponse.redirect(
	// 		new URL(`/id/super-admin/postgraduate/news`, request.url)
	// 	);
	// }

	// // Check if there is any supported locale in the pathname
	// const pathnameIsMissingLocale = i18n.locales.every(
	// 	(locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
	// );

	// // Redirect if there is no locale
	// if (pathnameIsMissingLocale) {
	// 	return NextResponse.redirect(
	// 		new URL(
	// 			`/id${pathname.startsWith("/") ? "" : "/"}${pathname}`,
	// 			request.url
	// 		)
	// 	);
	// }
}

export const config = {
	// Matcher ignoring `/_next/` and `/api/`
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
