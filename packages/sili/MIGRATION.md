# @ulam/sili Migration Guide

## v0.3.0: Modal → Dialog Breaking Change

### Summary

The `Modal` component has been renamed to `Dialog` for semantic accuracy and alignment with HTML's `<dialog>` element and ARIA `role="dialog"` semantics.

### Changes

**Component Rename**
- `Modal` → `Dialog`
- `ModalShell` → `DialogShell` (if using shell primitives)

**Affected Adapters**
- React (`@ulam/sili/react`)
- Remix (`@ulam/sili/remix`)
- Vue (`@ulam/sili/vue`)
- Angular (`@ulam/sili/angular`)

### Migration Path

#### React

```diff
-import { Modal } from '@ulam/sili/react'
+import { Dialog } from '@ulam/sili/react'

 function ConfirmDelete() {
   return (
-    <Modal open={isOpen} onClose={handleClose}>
+    <Dialog open={isOpen} onClose={handleClose}>
       Are you sure?
-    </Modal>
+    </Dialog>
   )
 }
```

#### Remix

```diff
-import { Modal } from '@ulam/sili/remix'
+import { Dialog } from '@ulam/sili/remix'

 export function NavMenu() {
   return (
-    <Modal>
+    <Dialog>
       <Navigation />
-    </Modal>
+    </Dialog>
   )
 }
```

#### Vue

```diff
-import { Modal, ModalShell } from '@ulam/sili/vue'
+import { Dialog, DialogShell } from '@ulam/sili/vue'

 <template>
-  <Modal :open="isOpen" @close="handleClose">
+  <Dialog :open="isOpen" @close="handleClose">
     Are you sure?
-  </Modal>
+  </Dialog>
 </template>
```

#### Angular

```diff
-import { Modal } from '@ulam/sili/angular'
+import { Dialog } from '@ulam/sili/angular'

 @Component({
   selector: 'confirm-delete',
-  template: `<sili-modal [open]="isOpen()" (close)="handleClose()">
+  template: `<sili-dialog [open]="isOpen()" (close)="handleClose()">
     Are you sure?
-  </sili-modal>`,
+  </sili-dialog>`,
 })
 export class ConfirmDeleteComponent { }
```

### Why This Change

- **HTML Semantics**: The native `<dialog>` element is the platform standard for modal dialogs
- **ARIA Alignment**: `role="dialog"` is the correct ARIA role for this component type
- **Web Standards**: Aligns sili with platform conventions rather than using non-standard terminology
- **Clarity**: "Dialog" accurately describes the component's purpose and behavior

### No Behavior Changes

The component's functionality remains identical:

- ✅ Focus management unchanged
- ✅ Escape key handling unchanged
- ✅ ARIA hiding unchanged
- ✅ Scroll lock unchanged
- ✅ Transition behavior unchanged
- ✅ Props/API structure unchanged (only component name changed)

### Deprecated Components

There are no backward-compatibility aliases. The `Modal` export has been removed. Update all imports to use `Dialog`.

### Help

If you have questions or issues with this migration, check:

1. [sili README](./README.md) — Complete API reference with Dialog documentation
2. [docs/ARCHITECTURE.md](../../docs/ARCHITECTURE.md) — Framework overview and design patterns
3. Package examples for your framework adapter (React, Vue, Angular, Remix)
