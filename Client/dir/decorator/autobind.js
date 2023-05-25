export default function Autobind(target, propertyName, descriptor) {
    // Method gốc
    const originalMethod = descriptor.value;
    const newDescriptor = {
        configurable: true,
        enumerable: false,
        // Thay vì dùng value trong descriptor thì dùng hàm getter, hàm getter return về cái gì thì giá trị
        // khi truy cập vào property (ở đây là hàm showMessage của obj tạo từ class Printer) sẽ là cái đó
        // Hàm getter sẽ nhận this là đối tượng gọi đến nó (ở đây sẽ là một obj được tạo từ class Printer)
        // nên có thể bind this cho method gốc
        get() {
            const bounedFunction = originalMethod.bind(this);
            return bounedFunction;
        },
    };
    return newDescriptor;
}
