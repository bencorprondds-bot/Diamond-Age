# Quick Start Guide - Step 10: Database Storage

## 🎯 What You Need to Do Now

### 1. Run Database Migration (Required!)
Go to Supabase and run the migration:

**URL**: https://supabase.com/dashboard/project/vltqueuuthssdigzbslp/sql/new

**Steps**:
1. Click the link above (or go to SQL Editor in Supabase)
2. Open the file: `supabase/migration.sql` in VS Code
3. Copy ALL the contents
4. Paste into Supabase SQL Editor
5. Click "Run" button

✅ You should see: "Success. No rows returned"

### 2. Start the Dev Server
```powershell
npm run dev
```

### 3. Test the Flow

**Test 1: Create Your First Character**
1. Open http://localhost:3000
2. Click the book to open
3. You'll see "Your Adventures" screen (empty)
4. Click "+ Create New Hero"
5. Fill out the form:
   - Name: (your daughter's name or test name)
   - Pronouns: she/her
   - Story Type: Creative Adventure
   - Fill in other fields as desired
6. Click "Begin Adventure"
7. Watch the story generate!
8. An image should appear on the right

**Test 2: Save the Story**
1. Click "Save Story" button (top right)
2. Enter a title like "The First Adventure"
3. Click Save
4. You should see "Story Saved!" confirmation

**Test 3: Continue the Story**
1. Type something in the text box at bottom
2. Click "Continue Story"
3. Watch it generate the next part
4. Another image should appear

**Test 4: Go Back and See Your Character**
1. Click "← Back to Menu"
2. You should see your character listed
3. Click "Edit" to modify traits
4. Or click "New Adventure" to start another story

**Test 5: Load Previous Story**
1. When you click "New Adventure" on a character
2. You'll see "Previous Adventures" section
3. Click on your saved story to resume it!

## 🎨 About Image Consistency

The first image for each character is now:
- Saved with the character profile
- Passed as reference to Gemini for future images
- Should help maintain consistent character appearance

**Note**: AI image generation still has some variance, but this significantly improves consistency!

## 🔍 Verify Database

To see your data in Supabase:
1. Go to: https://supabase.com/dashboard/project/vltqueuuthssdigzbslp/editor
2. Click "characters" table - see your heroes
3. Click "stories" table - see your saved stories

## 🐛 Common Issues

**"No heroes yet!"** - Good! Create your first one.

**Error saving character** - Check:
- Did you run the migration?
- Check browser console (F12) for errors
- Verify .env.local has Supabase keys

**Images not appearing** - Check:
- Google AI API key in .env.local
- Console for image generation errors

**Story not saving** - Check:
- Character was created first
- Story title is not empty
- Console for errors

## ✨ New Features You Have Now

1. **Persistent Characters** - Your daughter can have her favorite heroes saved
2. **Story Sessions** - Continue adventures over multiple days
3. **Character Editing** - Tweak traits as characters evolve
4. **Multiple Stories** - One character can have many adventures
5. **Better Image Consistency** - Reference images help maintain look

## 🎮 Next: Create Your Test Character

When you're ready to test, create a character with these traits (or your own):

**Name**: Luna
**Pronouns**: she/her
**Story Type**: Educational Journey
**Loves to do**: Building robots and exploring tide pools
**Wants to learn about**: How things work and ocean animals
**Special trait**: Can talk to sea creatures
**Hobbies**: Inventing gadgets and collecting shells

This character will be perfect for testing the save/load/edit flow!

---

**Ready?** Run the migration, start the server, and create your first character! 🚀
