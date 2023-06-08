<script lang="ts">
    export let contact: User
</script>
<div class="flex py-2 items-center gap-10">
    <img
        src={`data:image/svg+xml;base64`}
        alt="current user profile"
        class="w-10 aspect-square"
    />
        <!-- {active && (
            <div class="w-4 aspect-square rounded-full bg-green-500 absolute right-0 bottom-0 border-2 border-cc-200 dark:border-neutral-800"></div>
            )} -->
            <div class="hidden lg:block leading-relaxed">
                <h1>{contact.userName}</h1>
                  <!--   <${user?.avatarImage}`}
                <p>{user?.email}</p> -->
    </div>
</div>
  