import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

export function formatDate(dateInString: Date) {
    const date = new Date(dateInString)
    return format(date, "dd 'de' LLL 'de' yyyy", {locale: ptBR})
}
