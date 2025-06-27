import mongoose from "mongoose";
import bcrypt from "bcryptjs"

export interface UserInterface extends Document {
    id: string;
    username: string;
    email: string;
    password: string;
    matchPassword: (password: string) => Promise<boolean>
}

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },  
},
{timestamps: true});


userSchema.pre("save", async function(next){
    if(!this.isModified("password")) next();
    /**
     * Genera una cadena aleatoria llamada "salt" utilizando bcrypt con un factor de costo de 10.
     * El "salt" se utiliza para fortalecer la seguridad de las contraseñas al momento de ser hasheadas,
     * haciendo que cada hash sea único incluso si dos usuarios tienen la misma contraseña.
     */
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})


userSchema.methods.matchPassword = async function (enteredPassword: string) {
    if (!this.password) {
        return false;
    }
    return await bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model<UserInterface>("User", userSchema);
export default User;