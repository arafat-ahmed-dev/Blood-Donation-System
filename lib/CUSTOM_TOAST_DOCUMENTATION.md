# Custom Toast System Documentation

## Overview

The Custom Toast System provides a unified way to display toast notifications throughout the Blood Donation System. It's built on top of the existing shadcn/ui toast component and provides specialized methods for different contexts within the application.

## Features

- ✅ **Type-safe**: Full TypeScript support with predefined toast types
- 🎯 **Context-aware**: Specialized methods for different app contexts
- 🎨 **Consistent styling**: Automatic icon and styling based on context
- 🔄 **Duplicate prevention**: Built-in duplicate message prevention
- ⏱️ **Smart durations**: Appropriate durations for different message types
- 📱 **Responsive**: Works across all screen sizes

## Installation & Usage

### Import the toast utility

```typescript
import {
  CustomToast,
  verificationToasts,
  authToasts,
} from "@/lib/custom-toast";
```

## Basic Usage

### Generic Toast Methods

```typescript
// Success toast
CustomToast.success({
  title: "Operation Successful!",
  description: "Your action was completed successfully.",
  context: "general", // optional
  duration: 4000, // optional
});

// Error toast
CustomToast.error({
  title: "Something went wrong",
  description: "Please try again later.",
  context: "general",
});

// Warning toast
CustomToast.warning({
  description: "Please review your information before proceeding.",
});

// Info toast
CustomToast.info({
  description: "Your session will expire in 5 minutes.",
});

// Loading toast
const loadingToast = CustomToast.loading({
  description: "Processing your request...",
});
// Dismiss loading toast when done
loadingToast.dismiss();
```

## Specialized Context Methods

### Authentication (`authToasts`)

```typescript
import { authToasts } from "@/lib/custom-toast";

// Login success
authToasts.loginSuccess();

// Login error with custom message
authToasts.loginError("Account is temporarily locked");

// Other auth methods
authToasts.logoutSuccess();
authToasts.registrationSuccess();
authToasts.passwordReset();
```

### Email Verification (`verificationToasts`)

```typescript
import { verificationToasts } from "@/lib/custom-toast";

// Code sent successfully
verificationToasts.codeSent();

// Code expired
verificationToasts.codeExpired();

// Invalid code
verificationToasts.codeInvalid();

// Verification successful
verificationToasts.verificationSuccess();

// Too many attempts
verificationToasts.tooManyAttempts();
```

### Donation Management (`donationToasts`)

```typescript
import { donationToasts } from "@/lib/custom-toast";

donationToasts.scheduled();
donationToasts.completed();
donationToasts.cancelled();
donationToasts.eligibilityRequired();
```

### Appointment Management (`appointmentToasts`)

```typescript
import { appointmentToasts } from "@/lib/custom-toast";

appointmentToasts.booked();
appointmentToasts.cancelled();
appointmentToasts.rescheduled();
appointmentToasts.reminder();
```

### Profile Management (`profileToasts`)

```typescript
import { profileToasts } from "@/lib/custom-toast";

profileToasts.updated();
profileToasts.photoUploaded();
profileToasts.preferencesUpdated();
```

### Blood Requests (`bloodRequestToasts`)

```typescript
import { bloodRequestToasts } from "@/lib/custom-toast";

bloodRequestToasts.submitted();
bloodRequestToasts.approved();
bloodRequestToasts.fulfilled();
bloodRequestToasts.urgent();
```

### Admin Operations (`adminToasts`)

```typescript
import { adminToasts } from "@/lib/custom-toast";

adminToasts.userApproved();
adminToasts.inventoryUpdated();
adminToasts.reportGenerated();
```

### System Messages (`systemToasts`)

```typescript
import { systemToasts } from "@/lib/custom-toast";

systemToasts.networkError();
systemToasts.serverError();
systemToasts.maintenance();
systemToasts.updateAvailable();
```

## Error Handling Integration

### With Axios Error Handling

```typescript
import { CustomToast, systemToasts } from "@/lib/custom-toast";
import { isAxiosError } from "axios";

try {
  await api.post("/api/some-endpoint", data);
  CustomToast.success({
    description: "Data saved successfully!",
    context: "general",
  });
} catch (error) {
  if (isAxiosError(error)) {
    switch (error.response?.status) {
      case 400:
        CustomToast.error({
          title: "Invalid Data",
          description:
            error.response.data.message || "Please check your input.",
          context: "general",
        });
        break;
      case 401:
        authToasts.loginError("Session expired. Please log in again.");
        break;
      case 500:
        systemToasts.serverError();
        break;
      default:
        CustomToast.error({
          description: "An unexpected error occurred.",
          context: "general",
        });
    }
  } else {
    systemToasts.networkError();
  }
}
```

## Advanced Features

### Custom Context

```typescript
CustomToast.success({
  title: "Custom Operation",
  description: "Your custom operation was successful.",
  context: "admin", // Will show admin-specific icon
  duration: 6000,
});
```

### Dynamic Toast Types

```typescript
const toastType = isSuccess ? "success" : "error";
CustomToast.custom(toastType, {
  description: "Dynamic message based on condition",
  context: "donation",
});
```

### With Actions

```typescript
import { Button } from "@/components/ui/button";

CustomToast.warning({
  title: "Unsaved Changes",
  description: "You have unsaved changes. Would you like to save them?",
  action: (
    <Button variant="outline" size="sm">
      Save Now
    </Button>
  ),
});
```

## Available Contexts

- `auth` - Authentication operations (🔐)
- `verification` - Email/OTP verification (📧)
- `donation` - Blood donation operations (❤️)
- `appointment` - Appointment management (📅)
- `profile` - User profile operations (👤)
- `admin` - Administrative operations (⚙️)
- `blood-request` - Blood request operations (🩸)
- `inventory` - Inventory management (📦)
- `notification` - General notifications (ℹ️)
- `general` - Default context (ℹ️)

## Default Durations

- Success: 4 seconds
- Error: 6 seconds
- Warning: 5 seconds
- Info: 4 seconds
- Loading: Infinite (until manually dismissed)

## Best Practices

1. **Use specialized methods when available**: Prefer `authToasts.loginSuccess()` over generic methods
2. **Be consistent with contexts**: Use the same context for related operations
3. **Keep descriptions concise**: Aim for 1-2 lines maximum
4. **Use appropriate durations**: Longer durations for errors, shorter for success
5. **Handle loading states**: Always dismiss loading toasts when operations complete
6. **Provide actionable messages**: Tell users what they can do next

## Migration from Basic Toast

### Before

```typescript
import { useToast } from "@/components/ui/use-toast";

const { toast } = useToast();

toast({
  title: "Success",
  description: "Operation completed",
  variant: "default",
});
```

### After

```typescript
import { CustomToast } from "@/lib/custom-toast";

CustomToast.success({
  description: "Operation completed",
  context: "general",
});
```

## Troubleshooting

### Toast not appearing

- Ensure the `Toaster` component is included in your app layout
- Check browser console for any errors
- Verify import paths are correct

### Duplicate toasts

- The system automatically prevents duplicates within 3 seconds
- If you need to show the same message again quickly, add a timestamp or unique identifier

### Custom styling

- Modify the context icons in the `getContextIcon` function
- Adjust durations in the `TOAST_DURATIONS` constant
- Customize styling in the base toast component

## Examples in the Codebase

Check these files for real-world usage examples:

- `app/verify/page.tsx` - Email verification toasts
- `app/auth/page.tsx` - Authentication toasts
- `app/profile/page.tsx` - Profile management toasts
- `components/adminDashboard/` - Admin operation toasts
