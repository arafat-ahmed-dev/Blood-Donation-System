import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verify } from "jsonwebtoken"

// Define paths that require authentication
const protectedPaths = ["/profile", "/appointments", "/analytics"]

// Define admin-only paths
const adminPaths = ["/admin"]

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value
  const path = request.nextUrl.pathname

  // Check if path is protected
  const isProtectedPath = protectedPaths.some((pp) => path.startsWith(pp))
  const isAdminPath = adminPaths.some((ap) => path.startsWith(ap))

  // If the path is not protected, continue
  if (!isProtectedPath && !isAdminPath) {
    return NextResponse.next()
  }

  // If no token is found, redirect to login
  if (!token) {
    const url = new URL("/auth", request.url)
    url.searchParams.set("redirect", path)
    return NextResponse.redirect(url)
  }

  try {
    // Verify the token
    const decoded = verify(token, process.env.JWT_SECRET || "your-secret-key") as { id: string; isAdmin: boolean }

    // For admin paths, check if user is admin
    if (isAdminPath && !decoded.isAdmin) {
      return NextResponse.redirect(new URL("/", request.url))
    }

    // Valid token, continue
    return NextResponse.next()
  } catch (error) {
    // Invalid token, redirect to login
    const url = new URL("/auth", request.url)
    url.searchParams.set("redirect", path)
    return NextResponse.redirect(url)
  }
}

export const config = {
  matcher: [
    // Match all protected paths
    ...protectedPaths.map((path) => `${path}/:path*`),
    // Match all admin paths
    ...adminPaths.map((path) => `${path}/:path*`),
  ],
}
