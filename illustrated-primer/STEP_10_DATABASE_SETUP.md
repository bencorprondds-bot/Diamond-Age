# Step 10: Database Storage - Setup Instructions

## ✅ What We've Built

### Database Schema
- **Characters Table**: Stores hero profiles with all their traits
- **Stories Table**: Stores complete story sessions with segments and images
- **Relationships**: Stories are linked to characters

### API Routes Created
- `POST /api/character/save` - Save new character
- `PUT /api/character/save` - Update existing character
- `GET /api/character/list` - Get all characters
- `DELETE /api/character/[id]` - Delete a character
- `POST /api/story/save` - Save new story
- `PUT /api/story/save` - Update existing story
- `GET /api/story/load/[id]` - Load a specific story
- `GET /api/story/list` - Get all stories (optionally filtered by character)
- `DELETE /api/story/load/[id]` - Delete a story

### Features Added
1. **Character Selection Menu** - Choose existing heroes or create new ones
2. **Character Creation & Editing** - Full CRUD for character profiles
3. **Story Saving** - Name and save story sessions
4. **Story Loading** - Resume previous adventures
5. **Reference Image Support** - First image passed to Gemini for consistency

## 🚀 Setup Steps

### 1. Run the Database Migration

Go to your Supabase project dashboard:
1. Navigate to: https://supabase.com/dashboard/project/vltqueuuthssdigzbslp
2. Click on **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy the entire contents of `supabase/migration.sql`
5. Paste into the SQL editor
6. Click **Run** to execute the migration

This will create:
- `characters` table
- `stories` table
- Indexes for performance
- Row Level Security policies (currently open, for later user auth)
- Auto-update triggers for `updated_at` timestamps

### 2. Test the Application

```powershell
npm run dev
```

Then test:
1. **Create a Character**: Open the book → Create New Hero → Fill out form
2. **Start Adventure**: Click "Begin Adventure" to generate first story
3. **Save Story**: Click "Save Story" button → Give it a title → Save
4. **Continue Story**: Add your contribution → Continue Story
5. **Go Back**: Click "Back to Menu"
6. **Edit Character**: Select character → Click "Edit"
7. **New Adventure**: Select character → Click "New Adventure"
8. **Load Story**: When viewing a character with previous stories, click on a story to resume

## 🎨 How Reference Images Work

When generating images:
1. **First Image**: Creates the initial character and scene
   - Saved as `first_image` in character profile
2. **Subsequent Images**: Pass the first image as reference
   - Gemini 2.5 Flash Image uses it to maintain consistency
   - Same character appearance, similar art style

## 📝 Next Steps (Future Enhancements)

### Phase 1: Polish Current Features
- [ ] Add loading states for character/story lists
- [ ] Add confirmation dialogs for deletions
- [ ] Better error handling and user feedback
- [ ] Add story previews in the character menu

### Phase 2: Character Sheets
- [ ] Create detailed character reference sheets
- [ ] Store multiple reference images per character
- [ ] Allow manual upload of reference images
- [ ] Show character traits in a visual card

### Phase 3: Gamified Character Creation
- [ ] Random character trait generator
- [ ] Character evolution through interactions
- [ ] Personality development system
- [ ] Character relationship tracking

### Phase 4: User Authentication
- [ ] Add Supabase Auth
- [ ] Update RLS policies to filter by user
- [ ] Multi-user support
- [ ] Sharing stories between users

## 🐛 Troubleshooting

### Migration Fails
- Check if tables already exist: `SELECT * FROM characters;`
- Drop tables if needed: `DROP TABLE stories CASCADE; DROP TABLE characters CASCADE;`
- Re-run migration

### Character Not Saving
- Check browser console for errors
- Verify Supabase keys in `.env.local`
- Check Network tab for API responses

### Images Not Consistent
- Ensure first image is being saved with character
- Check that `referenceImage` is being passed in subsequent calls
- Gemini may still vary slightly - this is expected AI behavior

## 📊 Database Verification

Run these queries in Supabase SQL Editor to verify:

```sql
-- Check characters
SELECT * FROM characters ORDER BY created_at DESC;

-- Check stories with character info
SELECT 
  s.id, 
  s.title, 
  s.story_focus, 
  c.name as character_name,
  s.created_at
FROM stories s
JOIN characters c ON s.character_id = c.id
ORDER BY s.created_at DESC;

-- Count stories per character
SELECT 
  c.name,
  COUNT(s.id) as story_count
FROM characters c
LEFT JOIN stories s ON c.id = s.character_id
GROUP BY c.name;
```

## 🎉 Success Criteria

You'll know everything is working when you can:
1. ✅ Create a character and see it in the menu
2. ✅ Start a story and save it with a title
3. ✅ Exit and return to see your saved character
4. ✅ Load a previous story and continue it
5. ✅ Edit a character's traits
6. ✅ See consistent character appearance across images (mostly)

---

**Ready to test!** Open the app and create your first character.
