// Concepts: Numeric Enums, String Enums, Const Enums, Auto-increment
export const enum ChaiSize {
    SMALL = 1,
    MEDIUM,
    LARGE
}

export const enum OrderStatus {
    PENDING = "pending",
    PREPARING = "preparing",
    SERVED = "served",
    CANCELLED = "cancelled"
}

export const enum PaymentMethod {
    CASH,
    CARD,
    UPI,
}

export const enum ChaiCategory {
    MASALA = "masala",
    GINGER = "ginger",
    LEMON = "lemon",
    ELAICHI = "elaichi",
    ADRAK = "adrak"
}