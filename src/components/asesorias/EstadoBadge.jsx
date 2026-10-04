import Badge from "@/components/ui/Badge";
import { ESTADOS } from "@/utils/constants";

export default function EstadoBadge({ estado }) {
  const { label, color } = ESTADOS[estado];
  return <Badge className={color}>{label}</Badge>;
}