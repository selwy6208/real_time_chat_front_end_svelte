<script lang="ts">
    export let contact: User
</script>
<div class="flex py-2 items-center gap-10">
    <div class="flex justify-center items-center flex-shrink-0 h-10 w-10 text-2xl font-bold text-white rounded-full bg-gray-400">
        {contact.firstname.charAt(0)}{contact.lastname.charAt(0)}
    </div>
        <!-- {active && (
            <div class="w-4 aspect-square rounded-full bg-green-500 absolute right-0 bottom-0 border-2 border-cc-200 dark:border-neutral-800"></div>
            )} -->
            <div class="hidden lg:block leading-relaxed">
                <p class="text-2xl font-medium text-gray-500">{contact.firstname} {contact.lastname}</p>
                  <!--   <${user?.avatarImage}`}-->
    </div>
</div>
  