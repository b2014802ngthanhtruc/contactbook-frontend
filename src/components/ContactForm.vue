<template>
    <form @submit="submitContact" :validation-schema="contactFormSchema">
        <div class="form-group">
            <label for="name">Tên</label>
            <field v-if="contactLocal"
                name="name"
                type="text"
                class="form-control"
                v-model="contactLocal.name"
            />
            <field v-else
                name="name"
                type="text"
                class="form-control"
                autocomplete="name"
            />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="email">Email</label>
            <field v-if="contactLocal"
                name="email"
                type="email"
                class="form-control"
                v-model="contactLocal.email"
            />
            <field v-else
                name="email"
                type="email"
                class="form-control"
                autocomplete="email"
            />
            <ErrorMessage name="email" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="address">Địa chỉ</label>
            <field v-if="contactLocal"
                name="address"
                type="text"
                class="form-control"
                v-model="contactLocal.address"
            />
            <field v-else
                name="address"
                type="text"
                class="form-control"
                autocomplete="address"
            />
            <ErrorMessage name="address" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="phone">Điện thoại</label>
            <field v-if="contactLocal"
                name="phone"
                type="tel"
                class="form-control"
                v-model="contactLocal.phone"
            />
            <field v-else
                name="phone"
                type="tel"
                class="form-control"
                autocomplete="phone"
            />
            <ErrorMessage name="phone" class="error-feedback" />
        </div>

        <div class="form-group form-check">
            <input v-if="contactLocal"
                name="favorite"
                type="checkbox"
                class="form-check-input"
                v-model="contactLocal.favorite"
            />
            <input v-else
                name="favorite"
                type="checkbox"
                class="form-check-input"
                autocomplete="favorite"
            />
            <label for="favorite" class="form-check-label">
                <strong>Liên hệ yêu thích</strong>
            </label>
        </div>

        <div class="form-group">
            <button class="btn btn-primary">Lưu</button>
            <button
                v-if="contactLocal"
                type="button"
                class="ml-2 btn btn-danger"
                @click="deleteContact"
            >
                Xóa
            </button>
        </div>
    </form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage} from "vee-validate";

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:contact", "delete:contact"],
    props: {
        contact: { type: Object}
    },
    data() {
        const contactFormSchema = yup.object().shape({
            name: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải có ít nhất hai ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            email: yup
                .string()
                .email("E-mail không đúng.")
                .max(50, "E-mail tối đa 50 ký tự."),
            address: yup.string().max(100, "Địa chỉ tối đa 100 ký tự"),
            phone: yup
                .string()
                .matches(
                    /((09|03|07|08|05)+([0-9]{8})\b)/g,
                    "Số điện thoại không hợp lệ."
                ),
        });
        return {
            contactLocal: this.contact,
            contactFormSchema,
        };
    },
    methods: {
        submitContact() {
            this.$emit("submit:contact", this.contactLocal);
        },
        deleteContact(){
            this.$emit("delete:contact", this.contactLocal.id);
        },
    },
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>