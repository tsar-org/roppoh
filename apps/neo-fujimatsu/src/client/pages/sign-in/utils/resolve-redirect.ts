export function resolveRedirectUrl(searchParams: URLSearchParams): string {
  const redirect = searchParams.get("redirect");
  return redirect ?? (searchParams.has("sig") ? `/consent?${searchParams}` : "/account");
}
