type UserAvatarProps = {
  alt: string;
  avatarVersion?: string;
  displayName: string;
  hasAvatar: boolean;
  size?: "small" | "large";
};

function getInitials(displayName: string) {
  return displayName
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toLocaleUpperCase();
}

export function UserAvatar({
  alt,
  avatarVersion,
  displayName,
  hasAvatar,
  size = "small",
}: UserAvatarProps) {
  const sizeClass = size === "large" ? "h-24 w-24 text-2xl" : "h-10 w-10 text-sm";

  if (hasAvatar) {
    return (
      // La ruta autenticada debe cargarse directamente en el navegador.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        alt={alt}
        className={`${sizeClass} shrink-0 rounded-full border border-washi-200 bg-washi-100 object-cover`}
        height={size === "large" ? 96 : 40}
        src={`/cuenta/avatar?v=${encodeURIComponent(avatarVersion ?? "")}`}
        width={size === "large" ? 96 : 40}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className={`${sizeClass} flex shrink-0 items-center justify-center rounded-full bg-shu-100 font-bold text-shu-700`}
    >
      {getInitials(displayName)}
    </span>
  );
}
