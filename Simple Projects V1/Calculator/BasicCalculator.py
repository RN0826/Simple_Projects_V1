def add(a: float, b: float) -> float:
    """Return a + b.

    >>> add(2, 3)
    5
    """
    return a + b


def subtract(a: float, b: float) -> float:
    """Return a - b.

    >>> subtract(5, 12)
    -7
    """
    return a - b


def multiply(a: float, b: float) -> float:
    """Return a * b.

    >>> multiply(1.5, 4)
    6.0
    """
    return a * b


def divide(a: float, b: float) -> float:
    """Return a / b. Raises ZeroDivisionError if b == 0.

    >>> divide(10, 2)
    5.0
    """
    if b == 0:
        raise ZeroDivisionError("Cannot divide by zero.")
    return a / b


def percent(x: float, y: float) -> float:
    """Return x percent of y (i.e., (x/100) * y).

    >>> percent(20, 50)
    10.0
    """
    return (x / 100.0) * y


def read_int(prompt: str) -> int:
    while True:
        raw = input(prompt).strip()
        try:
            # Allow things like "3", "+4", "-2"
            if "." in raw:
                raise ValueError("Please enter a whole number (no decimals).")
            return int(raw)
        except ValueError as e:
            msg = str(e)
            print(f"  Invalid integer. {msg if msg else ''} Try again (examples: -3, 0, 5).")


def power(base: float, exponent: int) -> float:
    """Compute base**exponent for integer exponents using repeated multiplication.

    Handles negative exponents. Raises ZeroDivisionError for 0**negative.
    """
    if exponent == 0:
        # By convention, 0**0 is generally treated as 1 in programming
        return 1.0

    if exponent < 0:
        if base == 0:
            raise ZeroDivisionError("0 cannot be raised to a negative power.")
        exponent = -exponent
        result = 1.0
        for _ in range(exponent):
            result *= base
        return 1.0 / result

    # exponent > 0
    result = 1.0
    for _ in range(exponent):
        result *= base
    return result


def read_number(prompt: str) -> float:
    while True:
        raw = input(prompt).strip()
        try:
            return float(raw)
        except ValueError:
            print("  Invalid number. Try again (examples: 2, 3.14, -0.5).")


def read_yes_no(prompt: str, default_no: bool = True) -> bool:
    """
    Ask a yes/no question. Returns True for yes, False for no.
    default_no=True means Enter (blank) counts as 'no'.
    """
    while True:
        resp = input(prompt).strip().lower()
        if resp in {"y", "yes"}:
            return True
        if resp in {"n", "no"}:
            return False
        if resp == "":
            return not default_no if not default_no else False
        print("  Please answer yes or no (y/n).")


def menu() -> str:
    print("\n=== Basic Calculator — Level 1 ===")
    print("1) Addition (a + b)")
    print("2) Subtraction (a - b)")
    print("3) Multiplication (a * b)")
    print("4) Division (a / b)")
    print("5) Percent (x% of y)")
    print("6) Power (base^exponent)")
    print("Q) Quit")
    print("=================================")
    choice = input("> ").strip().lower()
    return choice


def main():
    print("Welcome! (Run tests with: python -m doctest calculator.py -v)")
    while True:
        choice = menu()
        if choice in {"q", "quit", "exit"}:
            print("Goodbye!")
            break

        try:
            if choice == "1":
                a = read_number("  Enter a: ")
                b = read_number("  Enter b: ")
                print(f"  Result: {add(a, b)}")

            elif choice == "2":
                a = read_number("  Enter a: ")
                b = read_number("  Enter b: ")
                print(f"  Result: {subtract(a, b)}")

            elif choice == "3":
                a = read_number("  Enter a: ")
                b = read_number("  Enter b: ")
                print(f"  Result: {multiply(a, b)}")

            elif choice == "4":
                a = read_number("  Enter a: ")
                b = read_number("  Enter b: ")
                print(f"  Result: {divide(a, b)}")

            elif choice == "5":
                x = read_number("  Enter x (percent): ")
                y = read_number("  Enter y (of this number): ")
                print(f"  Result: {percent(x, y)}")

            elif choice == "6":
                base = read_number("  Enter base: ")
                exp = read_int("  Enter exponent (integer): ")
                print(f"  Result: {power(base, exp)}")

            else:
                print("  Unknown option. Please choose from the menu.")

        except ZeroDivisionError as zde:
            print(f"  Error: {zde}")
        except Exception as e:
            print(f"  Unexpected error: {e}")

        # Ask whether to continue after handling this choice (success or error)
        print("\n=================================")
        if not read_yes_no("Do you want to perform another calculation? (y/n): "):
            print("Goodbye!")
            break


if __name__ == "__main__":
    main()
